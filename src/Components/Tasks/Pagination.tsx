"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <nav
      aria-label="Task pagination"
      className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
    >
      {/* Page info */}
      <p className="text-sm text-slate-500">
        Page <span className="font-medium text-slate-700">{currentPage}</span>{" "}
        of <span className="font-medium text-slate-700">{totalPages}</span>
      </p>

      {/* Controls */}
      <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1">
          {getPages().map((page, index) =>
            page === "..." ? (
              <span
                key={`dots-${index}`}
                className="flex h-9 w-8 items-center justify-center text-sm text-slate-400"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => onPageChange(page)}
                aria-current={currentPage === page ? "page" : undefined}
                className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
