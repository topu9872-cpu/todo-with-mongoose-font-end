const Features = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
  <div className="mb-10 text-center">
    <h2 className="text-3xl font-bold text-slate-900">
      Everything You Need
    </h2>

    <p className="mx-auto mt-3 max-w-2xl text-slate-600">
      Simple tools to help you organize your tasks and stay productive.
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-3">
    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl text-blue-600">
        ✓
      </div>

      <h3 className="text-xl font-semibold text-slate-900">
        Easy Task Management
      </h3>

      <p className="mt-2 text-slate-600">
        Create, update, complete, and delete your tasks with ease.
      </p>
    </div>

    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl text-blue-600">
        ☷
      </div>

      <h3 className="text-xl font-semibold text-slate-900">
        Stay Organized
      </h3>

      <p className="mt-2 text-slate-600">
        Keep all your important tasks organized in one place.
      </p>
    </div>

    <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl text-blue-600">
        ⚡
      </div>

      <h3 className="text-xl font-semibold text-slate-900">
        Boost Productivity
      </h3>

      <p className="mt-2 text-slate-600">
        Focus on what matters and complete your daily goals faster.
      </p>
    </div>
  </div>
</section>
  );
};

export default Features;