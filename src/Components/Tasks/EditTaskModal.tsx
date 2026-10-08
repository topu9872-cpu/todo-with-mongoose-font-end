"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

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

type EditTaskModalProps = {
  isOpen: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
};

export default function EditTaskModal({
  isOpen,
  task,
  onClose,
  onSave,
}: EditTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("Medium");
  const [status, setStatus] = useState<Task["status"]>("Pending");
  const [dueDate, setDueDate] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setStatus(task.status);
      setDueDate(task.dueDate);
      setProgress(task.progress ?? 0);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      ...task,
      title,
      description,
      priority,
      status,
      dueDate,
      progress,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Edit Task</h2>

            <p className="mt-1 text-sm text-slate-500">
              Update the task information below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            {/* Title */}
            <div>
              <label
                htmlFor="task-title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Task Title
              </label>

              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="task-description"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="task-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Priority + Status */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="task-priority"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Priority
                </label>

                <select
                  id="task-priority"
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as Task["priority"])
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="task-status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Status
                </label>

                <select
                  id="task-status"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as Task["status"])
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label
                htmlFor="task-due-date"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Due Date
              </label>

              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="task-progress"
                  className="block text-sm font-medium text-slate-700"
                >
                  Progress
                </label>

                <span className="text-sm font-semibold text-blue-600">
                  {progress}%
                </span>
              </div>

              <input
                id="task-progress"
                type="range"
                min={0}
                max={100}
                step={5}
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="range range-primary range-sm"
              />

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-liner-to-r from-blue-500 to-blue-600"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-100 p-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
