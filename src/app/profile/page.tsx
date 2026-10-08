"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import CreateTaskModalDialog from "@/src/Components/Tasks/CreateTaskModal";
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  ListTodo,
  MoreHorizontal,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Tasks",
    value: "48",
    change: "+12.5%",
    description: "from last month",
    icon: ListTodo,
  },
  {
    title: "Completed",
    value: "32",
    change: "+18.2%",
    description: "from last month",
    icon: CheckCircle2,
  },
  {
    title: "In Progress",
    value: "10",
    change: "+4.8%",
    description: "from last month",
    icon: Clock3,
  },
  {
    title: "Overdue",
    value: "6",
    change: "-10.5%",
    description: "from last month",
    icon: AlertCircle,
  },
];

const weeklyData = [
  ["Mon", 45],
  ["Tue", 65],
  ["Wed", 35],
  ["Thu", 80],
  ["Fri", 55],
  ["Sat", 30],
  ["Sun", 70],
];

const recentTasks = [
  {
    title: "Build task management API",
    category: "Development",
    priority: "High",
    status: "In Progress",
    date: "Today",
  },
  {
    title: "Design homepage",
    category: "Design",
    priority: "Medium",
    status: "Completed",
    date: "Yesterday",
  },
  {
    title: "Test authentication flow",
    category: "Development",
    priority: "High",
    status: "Pending",
    date: "Oct 10",
  },
  {
    title: "Update project documentation",
    category: "Documentation",
    priority: "Low",
    status: "Completed",
    date: "Oct 8",
  },
];

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from("[data-gsap='header']", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // Stats Cards Stagger
      gsap.from("[data-gsap='stat-card']", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.1,
      });

      // Main Analytics Cards
      gsap.from("[data-gsap='card']", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3,
      });

      // Weekly Activity Bar Height Animation
      document
        .querySelectorAll<HTMLElement>("[data-gsap='bar']")
        .forEach((bar, i) => {
          const targetHeight = bar.getAttribute("data-height") || "0%";
          gsap.fromTo(
            bar,
            { height: "0%" },
            {
              height: targetHeight,
              duration: 0.8,
              delay: 0.4 + i * 0.08,
              ease: "power3.out",
            },
          );
        });

      // Task Priority Progress Bar Height/Width Animation
      document
        .querySelectorAll<HTMLElement>("[data-gsap='priority-bar']")
        .forEach((bar, i) => {
          const targetWidth = bar.getAttribute("data-width") || "0%";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: targetWidth,
              duration: 0.8,
              delay: 0.5 + i * 0.1,
              ease: "power3.out",
            },
          );
        });

      // Recent Tasks Stagger
      gsap.from("[data-gsap='task-item']", {
        x: -15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.6,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          data-gsap="header"
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-medium text-blue-600">Dashboard</p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Good morning, Mehedi
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Here's what's happening with your tasks today.
            </p>
          </div>

        <CreateTaskModalDialog />
        </div>
        {/* Overview */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 auto-rows-fr">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith("+");

            return (
              <div
                key={stat.title}
                data-gsap="stat-card"
                className="flex h-full min-h-48 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">{stat.title}</p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-2 pt-5 text-xs">
                  <span
                    className={
                      isPositive ? "font-semibold text-emerald-600" : "font-semibold text-red-500"
                    }
                  >
                    {stat.change}
                  </span>

                  <span className="text-slate-400">{stat.description}</span>
                </div>
              </div>
            );
          })}
        </section>
        {/* Main Analytics */}
        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Completion */}
          <div
            data-gsap="card"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Task Completion
                </h2>

                <p className="mt-1 text-sm text-slate-500">Overall progress</p>
              </div>

              <TrendingUp className="text-blue-600" size={20} />
            </div>

            <div className="mt-8 flex items-center justify-center">
              <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-18 border-blue-100">
                <div className="absolute -inset-4.5 rounded-full border-18 border-transparent border-t-blue-600 border-r-blue-600 rotate-[-35deg]" />

                <div className="text-center">
                  <p className="text-4xl font-bold text-slate-900">67%</p>

                  <p className="mt-1 text-xs text-slate-400">completed</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Completed</p>

                <p className="mt-1 text-lg font-bold text-slate-900">32</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Remaining</p>

                <p className="mt-1 text-lg font-bold text-slate-900">16</p>
              </div>
            </div>
          </div>

          {/* Weekly Activity */}
          <div
            data-gsap="card"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Weekly Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Tasks completed this week
                </p>
              </div>

              <button
                type="button"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="mt-8 flex h-52 items-end justify-between gap-3">
              {weeklyData.map(([day, height]) => (
                <div
                  key={day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <div
                    data-gsap="bar"
                    data-height={`${height}%`}
                    className="w-full max-w-10 rounded-t-lg bg-blue-100 transition-colors hover:bg-blue-600"
                  />

                  <span className="text-xs text-slate-400">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom */}
        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Priority */}
          <div
            data-gsap="card"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="font-semibold text-slate-900">Tasks by Priority</h2>

            <p className="mt-1 text-sm text-slate-500">
              Current task distribution
            </p>

            <div className="mt-7 space-y-5">
              {[
                ["High", "12", "25%"],
                ["Medium", "20", "42%"],
                ["Low", "16", "33%"],
              ].map(([priority, count, percentage]) => (
                <div key={priority}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {priority}
                    </span>

                    <span className="text-slate-400">{count} tasks</span>
                  </div>

                  <div className="h-2 rounded-full bg-slate-100">
                    <div
                      data-gsap="priority-bar"
                      data-width={percentage}
                      className="h-full rounded-full bg-blue-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Tasks */}
          <div
            data-gsap="card"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">Recent Tasks</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your latest task activity
                </p>
              </div>

              <a
                href="/my-tasks"
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="mt-5 divide-y divide-slate-100">
              {recentTasks.map((task) => (
                <div
                  key={task.title}
                  data-gsap="task-item"
                  className="flex flex-col gap-3 py-4 transition-transform duration-150 hover:translate-x-1 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-slate-800">
                      {task.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {task.category} · {task.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {task.priority}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        task.status === "Completed"
                          ? "bg-green-50 text-green-600"
                          : task.status === "In Progress"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-yellow-50 text-yellow-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
