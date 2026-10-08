"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Pencil,
  Trash2,
  CircleDot,
} from "lucide-react";
import DeleteTaskModal from "./DeleteTaskModal";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
  progress: number;
  createdAt?: string;
  updatedAt?: string;
};

const initialTask: Task = {
  id: "1",
  title: "Build task management API",
  description:
    "Create task CRUD endpoints with proper validation, error handling, and API responses. The API should support creating, reading, updating, and deleting tasks.",
  priority: "High",
  status: "In Progress",
  dueDate: "2026-10-10",
  progress: 65,
  createdAt: "October 6, 2026",
  updatedAt: "October 8, 2026",
};

const priorityStyles = {
  High: "bg-red-50 text-red-600 border-red-100",
  Medium: "bg-yellow-50 text-yellow-600 border-yellow-100",
  Low: "bg-green-50 text-green-600 border-green-100",
};

const statusStyles = {
  Completed: "bg-green-50 text-green-600",
  "In Progress": "bg-blue-50 text-blue-600",
  Pending: "bg-yellow-50 text-yellow-600",
};

export default function TaskDetails() {
  const [task, setTask] = useState<Task>(initialTask);
  const [deleteTask, setDeleteTask] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleEdit = () => {
    setEditTask(task);
  };

  const handleSaveEdit = (updatedTask: Task) => {
    setTask({
      ...updatedTask,
      updatedAt: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    });
    setEditTask(null);
  };

  const handleDelete = () => {
    setDeleteTask({
      id: task.id,
      title: task.title,
    });
  };

  const handleComplete = () => {
    console.log("Complete task:", task.id);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/my-tasks"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to My Tasks
        </Link>

        {/* Main Card */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-slate-100 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                      statusStyles[task.status as keyof typeof statusStyles]
                    }`}
                  >
                    {task.status}
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                      priorityStyles[
                        task.priority as keyof typeof priorityStyles
                      ]
                    }`}
                  >
                    {task.priority} Priority
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {task.title}
                </h1>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                  {task.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

                <EditTaskModal
                  isOpen={editTask !== null}
                  task={editTask}
                  onClose={() => setEditTask(null)}
                  onSave={handleSaveEdit}
                />

                <DeleteTaskModal
                  isOpen={deleteTask !== null}
                  taskTitle={deleteTask?.title ?? ""}
                  onClose={() => setDeleteTask(null)}
                  onConfirm={() => {
                    console.log("Delete task:", deleteTask?.id);

                    setDeleteTask(null);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Task Information */}
          <div className="grid gap-4 border-b border-slate-100 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Status */}
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CircleDot size={17} />
                <span className="text-xs font-medium uppercase tracking-wide">
                  Status
                </span>
              </div>

              <p className="mt-2 font-semibold text-slate-800">{task.status}</p>
            </div>

            {/* Priority */}
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 size={17} />
                <span className="text-xs font-medium uppercase tracking-wide">
                  Priority
                </span>
              </div>

              <p className="mt-2 font-semibold text-slate-800">
                {task.priority}
              </p>
            </div>

            {/* Due Date */}
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CalendarDays size={17} />
                <span className="text-xs font-medium uppercase tracking-wide">
                  Due Date
                </span>
              </div>

              <p className="mt-2 font-semibold text-slate-800">
                {task.dueDate}
              </p>
            </div>

            {/* Updated */}
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock3 size={17} />
                <span className="text-xs font-medium uppercase tracking-wide">
                  Updated
                </span>
              </div>

              <p className="mt-2 font-semibold text-slate-800">
                {task.updatedAt}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="border-b border-slate-100 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">Task Progress</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Keep your task moving toward completion.
                </p>
              </div>

              <span className="text-sm font-semibold text-blue-600">65%</span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[65%] rounded-full bg-blue-600" />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Started</span>
              <span>In Progress</span>
              <span>Completed</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_280px]">
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Task Description
              </h2>

              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm leading-7 text-slate-600">
                  {task.description}
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  The implementation should follow a clean controller-service
                  structure and return consistent responses. Make sure the
                  endpoints are properly validated and handle errors gracefully.
                </p>
              </div>
            </div>

            {/* Metadata */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Task Information
              </h2>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-400">Task ID</span>

                  <span className="text-sm font-medium text-slate-700">
                    #{task.id}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-400">Created</span>

                  <span className="text-sm font-medium text-slate-700">
                    {task.createdAt}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-400">Last Updated</span>

                  <span className="text-sm font-medium text-slate-700">
                    {task.updatedAt}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Priority</span>

                  <span className="text-sm font-medium text-slate-700">
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>

        
        </section>
      </div>
    </main>
  );
}
