export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-24">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            ABOUT TODO
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Simple tasks.
            <span className="text-blue-600"> Better focus.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Todo is a simple task management application built to help you
            organize your work, keep track of what matters, and get things
            done without unnecessary complexity.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-sm font-semibold text-blue-600">
              OUR PURPOSE
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Productivity should feel simple.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Many productivity tools come with features that can make simple
              task management feel complicated. Todo takes a different
              approach by keeping the experience focused on the tasks you
              actually need to complete.
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Create a task, set its priority, keep track of the deadline,
              complete it, and move forward.
            </p>
          </div>

          {/* Product Preview */}
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/40">
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Today's Focus
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Keep moving forward
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-600">
                T
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  ✓
                </div>

                <span className="text-sm text-slate-400 line-through">
                  Plan today's work
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <div className="h-5 w-5 rounded-full border-2 border-blue-500" />

                <span className="text-sm font-medium text-slate-800">
                  Complete important tasks
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                <div className="h-5 w-5 rounded-full border-2 border-slate-300" />

                <span className="text-sm text-slate-700">
                  Review completed work
                </span>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">
                  Daily progress
                </span>

                <span className="font-semibold text-blue-600">
                  33%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-1/3 rounded-full bg-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold text-blue-600">
              WHY TODO
            </span>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Everything stays focused.
            </h2>

            <p className="mt-4 text-slate-600">
              The essential features you need to manage everyday tasks.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-semibold text-blue-600">
                ✓
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Simple
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Manage your tasks without unnecessary screens or complicated
                workflows.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-semibold text-blue-600">
                ⚡
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Fast
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Quickly create, update, complete, and manage your tasks.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-semibold text-blue-600">
                🎯
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Focused
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Keep your attention on the work that actually needs to get
                done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          Ready to get things done?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-slate-600">
          Start organizing your tasks and make your day a little easier.
        </p>

        <a
          href="/profle"
          className="mt-8 inline-flex items-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Start Managing Tasks
          <span className="ml-2">→</span>
        </a>
      </section>
    </main>
  );
}