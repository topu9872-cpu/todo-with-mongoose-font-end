const ProductivityStats = () => {
  return (
  <section className="bg-slate-50">
  <div className="mx-auto max-w-7xl px-4 py-20">
    <div className="grid items-center gap-12 lg:grid-cols-2">

      {/* Left Content */}
      <div>
        <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600">
          Stay Productive
        </span>

        <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
          Everything you need to
          <span className="text-blue-600"> manage your day.</span>
        </h2>

        <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
          Keep your tasks organized, track your progress, and stay focused
          without complicated productivity tools.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              ✓
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Simple task management
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                Create and manage your daily tasks in seconds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              ✓
            </div>

            <div>
              <h3 className="font-semibold text-slate-900">
                Track your progress
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                See what is completed and what still needs your attention.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Preview */}
      <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/50">
        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Today's Tasks
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Tuesday, October 8
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
            3 / 5
          </span>
        </div>

        <div className="mt-5 space-y-3">

          {/* Completed Task */}
          <div className="flex items-center gap-4 rounded-xl border border-slate-100 p-4">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
              ✓
            </div>

            <span className="text-sm text-slate-400 line-through">
              Design homepage
            </span>
          </div>

          {/* Active Task */}
          <div className="flex items-center gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="h-5 w-5 rounded-full border-2 border-blue-500" />

            <span className="text-sm font-medium text-slate-800">
              Build task management API
            </span>
          </div>

          {/* Active Task */}
          <div className="flex items-center gap-4 rounded-xl border border-slate-100 p-4">
            <div className="h-5 w-5 rounded-full border-2 border-slate-300" />

            <span className="text-sm text-slate-700">
              Test application
            </span>
          </div>

          {/* Active Task */}
          <div className="flex items-center gap-4 rounded-xl border border-slate-100 p-4">
            <div className="h-5 w-5 rounded-full border-2 border-slate-300" />

            <span className="text-sm text-slate-700">
              Deploy project
            </span>
          </div>

        </div>

        {/* Progress */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-slate-700">
              Daily Progress
            </span>

            <span className="font-medium text-blue-600">
              60%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[60%] rounded-full bg-blue-600" />
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
  );
};

export default ProductivityStats;