import Link from "next/link";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  completed: boolean;
};

type TaskCardProps = {
  task: Task;
  onComplete?: (id: string) => void;
  onDetails?: (id: string) => void;
};

const TasksPage = () => {
  const tasks = [
    {
      id: "1",
      title: "Build homepage",
      description:
        "Create a clean and responsive homepage for the Todo application.",
      priority: "High",
      dueDate: "Oct 10, 2026",
      completed: false,
    },
    {
      id: "2",
      title: "Create REST API",
      description: "Build task CRUD APIs using Express, Mongoose, and MongoDB.",
      priority: "Medium",
      dueDate: "Oct 11, 2026",
      completed: false,
    },
    {
      id: "3",
      title: "Test application",
      description: "Test the main task management features and fix any issues.",
      priority: "Low",
      dueDate: "Oct 12, 2026",
      completed: true,
    },
  ];

  const priorityStyles = {
    Low: "bg-green-50 text-green-600",
    Medium: "bg-yellow-50 text-yellow-600",
    High: "bg-red-50 text-red-600",
  };

  return (
    <main className="min-h-screen max-w-11/12 mx-auto mt-10">
      <section className="bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold text-blue-600">TASKS</span>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                All Tasks
              </h2>

              <p className="mt-2 text-slate-500">
                Manage and track tasks in one place.
              </p>
            </div>

            <button
              type="button"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              + Add Task
            </button>
          </div>

          {/* Cards */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <article
                key={task.id}
                className={`rounded-2xl border bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  task.completed
                    ? "border-slate-200 opacity-75"
                    : "border-blue-100"
                }`}
              >
                {/* Top */}
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      task.completed
                        ? "bg-slate-100 text-slate-500"
                        : priorityStyles[
                            task.priority as keyof typeof priorityStyles
                          ]
                    }`}
                  >
                    {task.completed ? "Completed" : task.priority}
                  </span>

                  <button
                    type="button"
                    className="rounded-lg px-2 py-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    •••
                  </button>
                </div>

                {/* Content */}
                <div className="mt-5">
                  <h3
                    className={`text-lg font-semibold ${
                      task.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-900"
                    }`}
                  >
                    {task.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                    {task.description}
                  </p>
                </div>

                {/* Bottom */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-400">
                    Due {task.dueDate}
                  </span>

                  <div className="flex gap-2">
                    {!task.completed && (
                      <button
                        type="button"
                        className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                      >
                        Complete
                      </button>
                    )}

                    <Link
                    href={`/tasks/${task.id}`}
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      See Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
export default TasksPage;
