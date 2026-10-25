"use client";

import { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import BackToBack from "@/src/Components/BackToBack";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Task } from "../types/Tasks";
import { getMyTasks } from "../app/api/ServerAction";
import { User } from "../app/lib/User";

const priorityStyles = {
  High: "bg-red-50 text-red-600",
  Medium: "bg-yellow-50 text-yellow-600",
  Low: "bg-green-50 text-green-600",
};

const statusStyles = {
  Completed: "bg-green-50 text-green-600",
  "In Progress": "bg-blue-50 text-blue-600",
  Pending: "bg-yellow-50 text-yellow-600",
};

type Filter = "All" | "Pending" | "In Progress" | "Completed";

const DashboardMyTask = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL parameters
  const search = String(searchParams.get("search") || "");
  const page = Number(searchParams.get("page")) || 1;
  const filter = (searchParams.get("filter") as Filter) || "All";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // Handle Page Change
  const handleCurrentPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  // Handle Search Input Change
  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1"); // Reset to page 1 on search
    router.push(`?${params.toString()}`);
  };

  // Handle Filter Change
  const handleFilterChange = (selectedFilter: Filter) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedFilter === "All") {
      params.delete("filter");
    } else {
      params.set("filter", selectedFilter);
    }
    params.set("page", "1"); // Reset to page 1 on filter change
    router.push(`?${params.toString()}`);
  };

  // Fetch Tasks with Server-Side Support
  useMemo(async () => {
    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const user = await User();
        if (!user) return;
        const data = await getMyTasks(search, page, 12, user?.id);

        if (cancelled) return;

        let fetchedTasks = data?.tasks || [];

        if (filter !== "All") {
          fetchedTasks = fetchedTasks.filter((t: Task) => t.status === filter);
        }

        setTasks(fetchedTasks);
        setTotal(data?.pagination?.total || 0);
        setTotalPages(data?.pagination?.totalPages || 1);
      } catch (error) {
        if (cancelled) return;
        setTasks([]);
        setTotal(0);
        setTotalPages(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search, page, filter]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex gap-5">
          <BackToBack />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              My Tasks
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage and track all your tasks in one place.
            </p>
          </div>
        </div>

        {/* Table Card */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search tasks..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto">
              {(["All", "Pending", "In Progress", "Completed"] as Filter[]).map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleFilterChange(item)}
                    className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                      filter === item
                        ? "bg-blue-600 text-white"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-138 text-left">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Task
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-16 text-center text-slate-400"
                    >
                      Loading tasks...
                    </td>
                  </tr>
                ) : tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr
                      key={task._id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <h3 className="font-medium text-slate-800">
                            {task.title}
                          </h3>
                          <p className="mt-1 max-w-md truncate text-sm text-slate-400">
                            {task.description}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                            priorityStyles[
                              task.priority as keyof typeof priorityStyles
                            ] || "bg-gray-50 text-gray-600"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                            statusStyles[
                              task.status as keyof typeof statusStyles
                            ] || "bg-gray-50 text-gray-600"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-500">
                        {task.dueDate}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex">
                          <Link
                            href={`/my-tasks/${task._id}`}
                            className="px-3 py-2.5 text-blue-500 font-semibold hover:text-blue-700"
                          >
                            Details
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <p className="font-medium text-slate-700">
                        No tasks found
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Try changing your search or filter.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing page{" "}
                <span className="font-medium text-slate-700">{page}</span> of{" "}
                <span className="font-medium text-slate-700">{totalPages}</span>{" "}
                ({total} total tasks)
              </p>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => handleCurrentPage(page - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleCurrentPage(p)}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${
                      page === p
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => handleCurrentPage(page + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default DashboardMyTask;
