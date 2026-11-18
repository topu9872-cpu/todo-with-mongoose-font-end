"use client";

import { deleteTask } from "@/src/app/api/ServerAction";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";

type DeleteTaskModalProps = {
  isOpen: boolean;
  taskTitle: string;
  onClose: () => void;
  id: string | undefined;
};

export default function DeleteTaskModal({
  isOpen,
  taskTitle,
  onClose,
  id,
}: DeleteTaskModalProps) {
  if (!isOpen) return null;

  const handleDeleteTask = async () => {
    const result = await deleteTask(id!);
    if (result.success) {
      toast.success(`task deleted successfully`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={21} />
            </div>

            <div>
              <p className="mt-1 text-sm text-slate-500">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="text-sm leading-6 text-slate-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-slate-900">
              &quot;{taskTitle}&quot;
            </span>
            ?
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDeleteTask}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
