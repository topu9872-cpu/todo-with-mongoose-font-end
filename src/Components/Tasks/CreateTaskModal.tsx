"use client";

import React, { useRef, useState } from "react";

interface TaskFormData {
  title: string;
  description: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  tags: string[];
  progress: number;
}

export default function CreateTaskModal() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Form State
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
    tags: [],
    progress: 0,
  });

  // Tag Input State
  const [tagInput, setTagInput] = useState("");

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  // Tag Handlers
  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ("key" in e && e.key !== "Enter") return;
    e.preventDefault();

    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Task Data:", formData);
    
    // Reset Form
    setFormData({
      title: "",
      description: "",
      status: "Pending",
      priority: "Medium",
      dueDate: "",
      tags: [],
      progress: 0,
    });
    
    closeModal();
  };

  return (
    <div className="z-50">
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
      >
        + Create Task
      </button>

      <dialog
        ref={dialogRef}
        className="modal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeModal();
          }
        }}
      >
        <div className="modal-box max-w-xl">
          <h3 className="text-xl font-bold text-slate-900">Create Task</h3>
          <p className="mt-1 text-sm text-slate-500">
            Add a new task to your workspace.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Title */}
            <label className="form-control w-full">
              <span className="label-text mb-2 text-sm font-medium text-slate-700">
                Task Title
              </span>
              <input
                type="text"
                required
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </label>

            {/* Description */}
            <label className="form-control w-full">
              <span className="label-text mb-2 text-sm font-medium text-slate-700">
                Description
              </span>
              <textarea
                placeholder="Describe what needs to be done..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="textarea textarea-bordered h-28 w-full"
              />
            </label>

            {/* Status, Priority & Due Date */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <label className="form-control w-full">
                <span className="label-text mb-2 text-sm font-medium text-slate-700">
                  Status
                </span>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as TaskFormData["status"],
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-2 text-sm font-medium text-slate-700">
                  Priority
                </span>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as TaskFormData["priority"],
                    })
                  }
                  className="select select-bordered w-full"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-2 text-sm font-medium text-slate-700">
                  Due Date
                </span>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            {/* Progress Percentage Slider */}
            <div className="form-control w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="label-text text-sm font-medium text-slate-700">
                  Progress
                </span>
                <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  {formData.progress}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={formData.progress}
                onChange={(e) =>
                  setFormData({ ...formData, progress: Number(e.target.value) })
                }
                className="range range-primary range-sm w-full"
              />
            </div>

            {/* Tags Input */}
            <div className="form-control w-full">
              <span className="label-text mb-2 text-sm font-medium text-slate-700">
                Tags
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a tag (e.g. Backend, Next.js) & press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="btn btn-outline btn-neutral"
                >
                  Add
                </button>
              </div>

              {/* Display Active Tags */}
              {formData.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 font-bold hover:text-red-500 focus:outline-none"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="modal-action pt-2">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                Create Task
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </div>
  );
}