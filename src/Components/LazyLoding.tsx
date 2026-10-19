import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Reusable lazy loader for heavy Next.js components.
 * Example:
 * const ProjectChart = LazyLoader(
 *   () => import("@/components/ProjectChart"),
 * );
 */
export const LazyLoader = <T extends object>(
  loader: () => Promise<{
    default: ComponentType<T>;
  }>,
) => {
  return dynamic(loader, {
    loading: () => (
      <div className="flex min-h-60 w-full items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-muted border-t-primary" />

            <div className="h-5 w-5 animate-pulse rounded-full bg-primary/20" />
          </div>

          <div className="flex flex-col items-center gap-1">
            <p className="text-sm font-medium text-foreground">
              Loading component
            </p>

            <p className="text-xs text-muted-foreground">
              Please wait a moment...
            </p>
          </div>

          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
          </div>
        </div>
      </div>
    ),
  });
};

/**
 * Usage example:
 *
 * const ProjectChart = LazyLoader(
 *   () => import("@/components/ProjectChart"),
 * );
 *
 * <ProjectChart />
 */