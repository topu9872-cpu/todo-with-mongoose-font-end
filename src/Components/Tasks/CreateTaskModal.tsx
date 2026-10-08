"use client";

import { useRef } from "react";

export default function CreateTaskModal() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
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

          <div className="mt-5 space-y-4">
            <label className="form-control w-full">
              <span className="label-text mb-2 text-sm font-medium text-slate-700">
                Task title
              </span>
              <input
                type="text"
                placeholder="Enter task title"
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-2 text-sm font-medium text-slate-700">
                Description
              </span>
              <textarea
                placeholder="Describe what needs to be done..."
                className="textarea textarea-bordered h-28 w-full"
              />
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="form-control w-full">
                <span className="label-text mb-2 text-sm font-medium text-slate-700">
                  Priority
                </span>
                <select className="select select-bordered w-full">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-2 text-sm font-medium text-slate-700">
                  Due date
                </span>
                <input type="date" className="input input-bordered w-full" />
              </label>
            </div>
          </div>

          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={closeModal}>
              Cancel
            </button>

            <button type="button" className="btn btn-primary" onClick={closeModal}>
              Create Task
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </div>
  );
}