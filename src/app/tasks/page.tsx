"use client";

import Pagination from "@/src/Components/Tasks/Pagination";
import TaskSearch from "@/src/Components/Tasks/TaskSearch";
import Link from "next/link";
import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  completed: boolean;
};

const TasksPage = () => {
  const [value, setValue] = useState("");

  const tasks: Task[] = [
    {
      id: "1",
      title: "Build homepage",
      description:
        "Create a clean and responsive homepage for the Todo application.",
      priority: "High",
      dueDate: "Oct 10, 2026",
      completed: false,
    },
    {
      id: "2",
      title: "Create REST API",
      description: "Build task CRUD APIs using Express, Mongoose, and MongoDB.",
      priority: "Medium",
      dueDate: "Oct 11, 2026",
      completed: false,
    },
    {
      id: "3",
      title: "Test application",
      description: "Test the main task management features and fix any issues.",
      priority: "Low",
      dueDate: "Oct 12, 2026",
      completed: true,
    },
    {
      id: "4",
      title: "Test application",
      description: "Test the main task management features and fix any issues.",
      priority: "Low",
      dueDate: "Oct 12, 2026",
      completed: true,
    },
  ];

  const priorityStyles: Record<string, string> = {
    Low: "bg-green-50 text-green-600",
    Medium: "bg-yellow-50 text-yellow-600",
    High: "bg-red-50 text-red-600",
  };

  return (
    <main className="min-h-screen w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold text-blue-600">TASKS</span>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              All Tasks
            </h2>

            <p className="mt-2 text-slate-500">
              Manage and track tasks in one place.
            </p>
          </div>
          <TaskSearch value={value} onChange={setValue} />
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task) => (
            <article
              key={task.id}
              className="rounded-xl  bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Top */}
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    task.completed
                      ? "bg-green-100 text-green-500"
                      : priorityStyles[task.priority]
                  }`}
                >
                  {task.completed ? "Completed" : task.priority}
                </span>
              </div>

              {/* Content */}
              <div className="mt-3">
                <h3 className="truncate text-sm font-semibold text-slate-900">
                  {task.title}
                </h3>

                <p className="mt-1 line-clamp-2 min-h-10 text-xs leading-5 text-slate-500">
                  {task.description}
                </p>
              </div>

              {/* Bottom */}
              <div className="mt-3 border-t border-slate-100 pt-3">
                <p className="mb-3 text-[11px] text-slate-400">
                  Due {task.dueDate}
                </p>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/tasks/${task.id}`}
                    className="flex-1 rounded-lg bg-blue-600 px-2 py-2 text-center text-xs font-medium text-white transition hover:bg-blue-700"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    </main>
  );
};

export default TasksPage;