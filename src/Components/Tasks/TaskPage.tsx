    "use client";
    
    import Pagination from "@/src/Components/Tasks/Pagination";
    import TaskSearch from "@/src/Components/Tasks/TaskSearch";
    import Link from "next/link";
    import { useTranslation } from "react-i18next";
    import { useEffect, useState } from "react";

    import type { Task } from "@/src/types/Tasks";
    import { useRouter, useSearchParams } from "next/navigation";
import { getTasks } from "@/src/app/api/ServerAction";

const TaskPage = () => {


    
  
      const { t } = useTranslation();
    
      const [tasks, setTasks] = useState<Task[]>([]);
     
      const [totalPages, setTotalPages] = useState(0);
      const [loading, setLoading] = useState(false);
      const [total, setTotal] = useState(0);
    
    
    
      const router = useRouter();
    const searchParams = useSearchParams();
    
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    
    const handlePageChange = (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
    
      params.set("page", String(newPage));
    
      router.push(`?${params.toString()}`, { scroll: false });
    };
    
      useEffect(() => {
        let cancelled = false;
    
        const timer = setTimeout(async () => {
          setLoading(true);
    
          try {
            const data = await getTasks(search, page, 12);

            if (cancelled) return;
    
            setTasks(data.tasks);
            setTotal(data.pagination.total);
            setTotalPages(data.pagination.totalPages);
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
      }, [search, page]);
    
    
      
    
  return (
     <main className="min-h-screen w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold text-blue-600">
              {t("tasks.allTasks").toUpperCase()}
            </span>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {t("tasks.allTasks")}
            </h2>

            <p className="mt-2 text-slate-500">{t("tasks.allTasksDesc")}</p>
          </div>
         <TaskSearch
  value={search}
  onChange={(value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.push(`?${params.toString()}`, { scroll: false });
  }}
/>
        </div>
        {loading ? (
  <p className="py-8 text-center">Loading tasks...</p>
) : total === 0 ? (
  <p className="py-8 text-center">No tasks found.</p>
) : (

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks?.map((task) => (
            <article
              key={task._id}
              className="rounded-xl  bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : task.status === "In Process"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {t(
                    `${
                      task.status === "Completed"
                        ? "Completed"
                        : task.status === "In Process"
                          ? "In Process"
                          : "Pending"
                    }`,
                  )}
                </span>
              </div>

              <div className="mt-3">
                <h3 className="truncate text-sm font-semibold text-slate-900">
                  {task.title}
                </h3>

                <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
                  {task.description}
                </p>
              </div>

              <div className="mt-3 border-t border-slate-100 pt-3">
                <p className="mb-3 text-[11px] text-slate-400">
                  Date:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"}
                </p>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/tasks/${task._id}`}
                    className="flex-1 rounded-lg bg-blue-600 px-2 py-2 text-center text-xs font-medium text-white transition hover:bg-blue-700"
                  >
                    {t("tasks.details")}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>)}
      </div>
      <Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>
    </main>
  );
};

export default TaskPage;