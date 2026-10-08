const Banner = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white px-6 py-12 shadow-sm md:px-12 lg:px-16">
      {/* Background shapes */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100" />
      <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-blue-50" />

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
        {/* Left Content */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-2xl text-white">
              ✓
            </div>

            <span className="text-xl font-bold text-slate-900">
              Todo <span className="text-blue-600">App</span>
            </span>
          </div>

          <h1 className="max-w-xl text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Stay Organized,
            <span className="block text-blue-600">
              Get Things Done
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-8 text-slate-600">
            Manage your daily tasks, stay focused, and make progress
            every day with a simple and powerful todo app.
          </p>

          <div className="mt-8 flex flex-wrap gap-6">
            <div>
              <p className="font-semibold text-slate-900">✓ Add Tasks</p>
              <p className="text-sm text-slate-500">Quick and easy</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900">☷ Track Progress</p>
              <p className="text-sm text-slate-500">Stay on schedule</p>
            </div>

            <div>
              <p className="font-semibold text-slate-900">⚡ Be Productive</p>
              <p className="text-sm text-slate-500">Achieve more</p>
            </div>
          </div>

          <button className="mt-8 rounded-full bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700">
            Start Now →
          </button>
        </div>

        {/* Right Illustration */}
        <div className="relative flex justify-center">
          <div className="absolute h-72 w-72 rounded-full bg-blue-50" />

          <div className="relative w-full max-w-md rounded-3xl border-4 border-blue-500 bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="h-4 w-32 rounded-full bg-blue-600" />
              <div className="h-8 w-8 rounded-full bg-blue-100" />
            </div>

            {/* Todo items */}
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                  ✓
                </div>
                <div className="h-3 flex-1 rounded-full bg-blue-200" />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                  ✓
                </div>
                <div className="h-3 flex-1 rounded-full bg-blue-200" />
              </div>

              <div className="flex items-center gap-4">
                <div className="h-7 w-7 rounded-lg border-2 border-blue-300" />
                <div className="h-3 flex-1 rounded-full bg-slate-200" />
              </div>

              <div className="flex items-center gap-4">
                <div className="h-7 w-7 rounded-lg border-2 border-blue-300" />
                <div className="h-3 w-3/4 rounded-full bg-slate-200" />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between rounded-2xl bg-blue-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Today's Progress
                </p>
                <p className="text-xs text-slate-500">
                  2 of 4 tasks completed
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-blue-500 font-bold text-blue-600">
                50%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;