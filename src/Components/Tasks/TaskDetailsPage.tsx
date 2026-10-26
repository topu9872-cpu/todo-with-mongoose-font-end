"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Pencil,
  Trash2,
  CircleDot,
} from "lucide-react";
import DeleteTaskModal from "./DeleteTaskModal";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";
import type { Task } from "@/src/types/Tasks";

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

interface TaskDetailsProps {
  myTaskDetails?: Task & { id?: string };
}

export default function TaskDetails({ myTaskDetails }: TaskDetailsProps) {
  // Guard clause if data hasn't loaded or task is not found
  if (!myTaskDetails) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-md w-full">
          <h2 className="text-xl font-bold text-slate-900">Task Not Found</h2>
          <p className="mt-2 text-sm text-slate-500">
            We couldn't load the details for this task. It may have been deleted or doesn't exist.
          </p>
          <Link
            href="/my-tasks"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            Back to My Tasks
          </Link>
        </div>
      </main>
    );
  }

  const {
    _id ,
    createdAt,
    description,
    dueDate,
    priority,
    progress = 0,
    status,
    tags,
    title,
  } = myTaskDetails;
  const [deleteTask, setDeleteTask] = useState<{
    id: string;
    title: string;
  } | null>(null);
  
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleEdit = () => {
    setEditTask(myTaskDetails);
  };

  const handleSaveEdit = (updatedTask: Task) => {
    setEditTask(null);
  };

  const handleDelete = () => {
    setDeleteTask({ _id, title });
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
                      statusStyles[status as keyof typeof statusStyles] || "bg-slate-50 text-slate-600"
                    }`}
                  >
                    {status}
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                      priorityStyles[priority as keyof typeof priorityStyles] || "bg-slate-50 text-slate-600"
                    }`}
                  >
                    {priority} Priority
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {title}
                </h1>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                  {description}
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

              {/* <EditTaskModal
                 
                />

                <DeleteTaskModal
                 
            />  */}
              </div>
            </div>
          </div>

          {/* Task Information Cards */}
          <div className="grid gap-4 border-b border-slate-100 p-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CircleDot size={17} />
                <span className="text-xs font-medium uppercase tracking-wide">Status</span>
              </div>
              <p className="mt-2 font-semibold text-slate-800">{status}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 size={17} />
                <span className="text-xs font-medium uppercase tracking-wide">Priority</span>
              </div>
              <p className="mt-2 font-semibold text-slate-800">{priority}</p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-400">
                <CalendarDays size={17} />
                <span className="text-xs font-medium uppercase tracking-wide">Due Date</span>
              </div>
              <p className="mt-2 font-semibold text-slate-800">{dueDate ? new Date(dueDate).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
}) : "No date"}</p>
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
              <span className="text-sm font-semibold text-blue-600">{progress}%</span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
              <div 
                className="h-full rounded-full bg-blue-600 transition-all duration-300" 
                style={{ width: `${progress}%` }} 
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Started</span>
              <span>In Progress</span>
              <span>Completed</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_280px]">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Task Description</h2>
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-sm leading-7 text-slate-600">{description}</p>
              </div>

              {tags && tags.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                      <span key={idx} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Metadata */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Task Information</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-400">Task ID</span>
                  <span className="text-sm font-medium text-slate-700">#{_id}</span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-400">Created</span>
                  <span className="text-sm font-medium text-slate-700">
                 {createdAt ? new Date(createdAt).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
}) : "No date"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Priority</span>
                  <span className="text-sm font-medium text-slate-700">{priority}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}