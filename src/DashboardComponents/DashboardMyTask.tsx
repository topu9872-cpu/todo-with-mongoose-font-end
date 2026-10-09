"use client";

import { useMemo, useState } from "react";
import {
  MoreHorizontal,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import BackToBack from "@/src/Components/BackToBack";
import Link from "next/link";

const tasks = [
  {
    id: "1",
    title: "Build task management API",
    description: "Create task CRUD endpoints",
    priority: "High",
    status: "In Progress",
    dueDate: "Oct 10, 2026",
  },
  {
    id: "2",
    title: "Design homepage",
    description: "Create responsive homepage UI",
    priority: "Medium",
    status: "Completed",
    dueDate: "Oct 08, 2026",
  },
  {
    id: "3",
    title: "Test authentication flow",
    description: "Test login and authorization",
    priority: "High",
    status: "Pending",
    dueDate: "Oct 12, 2026",
  },
  {
    id: "4",
    title: "Update documentation",
    description: "Update project documentation",
    priority: "Low",
    status: "Completed",
    dueDate: "Oct 08, 2026",
  },
  {
    id: "5",
    title: "Deploy production API",
    description: "Deploy backend to production",
    priority: "High",
    status: "Pending",
    dueDate: "Oct 15, 2026",
  },
  {
    id: "6",
    title: "Create dashboard UI",
    description: "Build dashboard analytics section",
    priority: "Medium",
    status: "In Progress",
    dueDate: "Oct 16, 2026",
  },
  {
    id: "7",
    title: "Fix mobile navigation",
    description: "Improve responsive navigation",
    priority: "Low",
    status: "Pending",
    dueDate: "Oct 18, 2026",
  },
];

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


      const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const tasksPerPage = 5;

  // Search + filter
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

      const matchesFilter = filter === "All" || task.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const startIndex = (currentPage - 1) * tasksPerPage;

  const paginatedTasks = filteredTasks.slice(
    startIndex,
    startIndex + tasksPerPage,
  );

  const handleFilter = (newFilter: Filter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };


  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex gap-5">
          <BackToBack />
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            My Tasks
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage and track all your tasks in one place.
          </p>
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
                onChange={(e) => handleSearch(e.target.value)}
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
                    onClick={() => handleFilter(item)}
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
            <table className="w-full min-w-213 text-left">
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

                  <th className="px-6 py-4  text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedTasks.length > 0 ? (
                  paginatedTasks.map((task) => (
                    <tr
                      key={task.id}
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
                            ]
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
                            ]
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-500">
                        {task.dueDate}
                      </td>

                      <td className="px-6 py-5 ">
                        <div className=" flex  text-center">
                          <Link
                            href={`/my-tasks/${task.id}`}
                            className=" items-center  px-3 py-2.5  hover:text-blue-700 text-blue-500 font-semibold  "
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
          {filteredTasks.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-medium text-slate-700">
                  {startIndex + 1}–
                  {Math.min(startIndex + tasksPerPage, filteredTasks.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-700">
                  {filteredTasks.length}
                </span>{" "}
                tasks
              </p>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => page + 1)}
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