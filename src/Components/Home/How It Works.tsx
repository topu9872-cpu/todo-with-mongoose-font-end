const HowItWorks = () => {
  return (
    <section className="bg-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Get started with your daily tasks in just three simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              1
            </div>

            <h3 className="mt-5 text-xl font-semibold text-slate-900">
              Create a Task
            </h3>

            <p className="mt-2 text-slate-600">
              Add the tasks you need to complete and keep track of them.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              2
            </div>

            <h3 className="mt-5 text-xl font-semibold text-slate-900">
              Complete Your Tasks
            </h3>

            <p className="mt-2 text-slate-600">
              Work through your task list and mark completed tasks as you go.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
              3
            </div>

            <h3 className="mt-5 text-xl font-semibold text-slate-900">
              Track Your Progress
            </h3>

            <p className="mt-2 text-slate-600">
              See your progress and stay motivated to accomplish your goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
