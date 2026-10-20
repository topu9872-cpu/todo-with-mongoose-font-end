export const instant = false;

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CircleDot,
  Flag,
  Tag,
  Share2,
  Edit3,
} from "lucide-react";
import { getTaskDetails } from "../../api/ServerAction";

const priorityStyles = {
  High: "bg-red-50 text-red-700 border-red-200 shadow-sm",
  Medium: "bg-amber-50 text-amber-700 border-amber-200 shadow-sm",
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm",
};

const statusStyles = {
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  "In Progress": "bg-sky-50 text-sky-700 border border-sky-200",
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
};

export default async function TaskDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const taskDetails = await getTaskDetails(id);

  if (!taskDetails) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]" />
          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading task details...
          </p>
        </div>
      </main>
    );
  }

  const {
    createdAt,
    description,
    dueDate,
    priority,
    progress,
    status,
    tags = [],
    title,
  } = taskDetails;
  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100/50 py-10 mx-auto">
      {/* Navigation & Actions Top Bar */}
      <div className="mb-6  items-center ">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to Tasks
        </Link>

        {/* Main Card Container */}
        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
          {/* Header Section */}
          <div className="border-b border-slate-100 bg-linear-to-r from-slate-50/50 to-white p-6 sm:p-8">
            <div className="flex flex-col gap-4">
              {/* Badges & Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide ${statusStyles[status as keyof typeof statusStyles] || "bg-slate-100 text-slate-700"}`}
                >
                  {status}
                </span>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold tracking-wide ${priorityStyles[priority as keyof typeof priorityStyles] || "bg-slate-100 text-slate-700"}`}
                >
                  {priority} Priority
                </span>

                {tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    <Tag size={12} className="text-slate-400" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Description */}
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  {title}
                </h1>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 border-b border-slate-100 bg-slate-50/50 p-6 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <CircleDot size={16} className="text-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-slate-800">{status}</p>
            </div>

            <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Flag size={16} className="text-amber-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Priority
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-slate-800">
                {priority}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <CalendarDays size={16} className="text-emerald-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Due Date
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-slate-800">
                {new Date(dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/60 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock3 size={16} className="text-indigo-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Created
                </span>
              </div>
              <p className="mt-2 text-sm font-bold text-slate-800">
                {new Date(createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Progress Tracker Section */}
          <div className="border-b border-slate-100 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Task Progress
                </h2>
                <p className="text-xs text-slate-500">
                  Overall completion metric
                </p>
              </div>
              <span className="rounded-xl bg-blue-50 px-3 py-1 text-sm font-black text-blue-600">
                {progress}%
              </span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100 p-0.5">
              <div
                className="h-full rounded-full bg-linear-to-r from-blue-500 to-indigo-600 transition-all duration-500 shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Details Metadata Sidebar & Main Overview */}
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="text-base font-bold text-slate-900">
                Overview & Notes
              </h2>
              <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                <p className="text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            </div>

            {/* Task Information Sidebar */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Metadata
              </h2>
              <div className="mt-4 space-y-3.5 text-sm">
                <div className="  flex-col flex border-b  border-slate-200/60 pb-3">
                  <span className="text-slate-500 text-start">Task ID:</span>
                  <span className="font-mono font-semibold text-slate-700">
                    #{id}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <span className="text-slate-500">Created At</span>
                  <span className="font-semibold text-slate-700">
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Due Date</span>
                  <span className="font-semibold text-slate-700">
                    {new Date(dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Public Notice Footer */}
          <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
              <p className="text-xs font-medium text-slate-600">
                <strong className="text-slate-800">Public Task:</strong> This
                item is synchronized and visible across your workspace.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
