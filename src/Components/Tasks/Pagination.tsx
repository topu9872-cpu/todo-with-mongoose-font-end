"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];

  if (totalPages <= 5) {
    pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
  } else {
    pages.push(1);

    if (currentPage > 3) pages.push("...");

    for (
      let p = Math.max(2, currentPage - 1);
      p <= Math.min(totalPages - 1, currentPage + 1);
      p++
    ) {
      pages.push(p);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);
  }

  return (
    <nav
      aria-label="Task pagination"
      className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row"
    >
      <p className="text-sm text-slate-500">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className="rounded-lg border p-2 hover:bg-slate-100 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((p, index) =>
          p === "..." ? (
            <span key={`dots-${index}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              aria-current={currentPage === p ? "page" : undefined}
              className={`min-w-10 rounded-lg px-3 py-2 text-sm ${
                currentPage === p
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-slate-100"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className="rounded-lg border p-2 hover:bg-slate-100 disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  );
}