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
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const stats = [
  { title: "Total Tasks", value: "48", change: "+12.5%", description: "from last month", icon: ListTodo },
  { title: "Completed", value: "32", change: "+18.2%", description: "from last month", icon: CheckCircle2 },
  { title: "In Progress", value: "10", change: "+4.8%", description: "from last month", icon: Clock3 },
  { title: "Overdue", value: "6", change: "-10.5%", description: "from last month", icon: AlertCircle },
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
  { title: "Build task management API", category: "Development", priority: "High", status: "In Progress", date: "Today" },
  { title: "Design homepage", category: "Design", priority: "Medium", status: "Completed", date: "Yesterday" },
  { title: "Test authentication flow", category: "Development", priority: "High", status: "Pending", date: "Oct 10" },
  { title: "Update project documentation", category: "Documentation", priority: "Low", status: "Completed", date: "Oct 8" },
];

export default function DashboardPageClient() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-gsap='header']", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from("[data-gsap='stat-card']", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.1,
      });

      gsap.from("[data-gsap='card']", {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3,
      });

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
        <div
          data-gsap="header"
          className="relative z-50 mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-medium text-blue-600">{t("dashboard.badge")}</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              {t("dashboard.greeting")}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {t("dashboard.greetingDesc")}
            </p>
          </div>
          <div className="flex gap-5">
            <CreateTaskModalDialog />
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className=" border-2 border-blue-700 rounded-full">
                    <Image
                      height={100}
                      width={100}
                      alt="User avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div aria-label="success" className="status status-success animate-ping -top-2 right-1 relative" />

                <ul tabIndex={0} className="menu menu-sm dropdown-content absolute right-0 top-full z-50 mt-3 w-52 rounded-box bg-base-100 p-4 text-blue-500 text-sm font-semibold shadow-xl">
                  <li>
                    <Link href="/profile" className="justify-between">
                      {t("dashboard.profile")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings">{t("dashboard.settings")}</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 ">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith("+");

            return (
              <div key={stat.title} data-gsap="stat-card" className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">{stat.title}</p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{stat.value}</h2>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-2 pt-5 text-xs">
                  <span className={isPositive ? "font-semibold text-emerald-600" : "font-semibold text-red-500"}>{stat.change}</span>
                  <span className="text-slate-400">{t("dashboard.fromLastMonth")}</span>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <div data-gsap="card" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">{t("dashboard.taskProgress")}</h2>
                <p className="mt-1 text-sm text-slate-500">{t("dashboard.overview")}</p>
              </div>
              <TrendingUp className="text-blue-600" size={20} />
            </div>

            <div className="mt-8 flex items-center justify-center">
              <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-18 border-blue-100">
                <div className="absolute -inset-4.5 rounded-full border-18 border-transparent border-t-blue-600 border-r-blue-600 rotate-[-35deg]" />
                <div className="text-center">
                  <p className="text-4xl font-bold text-slate-900">67%</p>
                  <p className="mt-1 text-xs text-slate-400">{t("dashboard.completed")}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-400">{t("dashboard.completed")}</p>
                <p className="mt-1 text-lg font-bold text-slate-900">32</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-400">{t("dashboard.overdue")}</p>
                <p className="mt-1 text-lg font-bold text-slate-900">16</p>
              </div>
            </div>
          </div>

          <div data-gsap="card" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">{t("dashboard.weeklyActivity")}</h2>
                <p className="mt-1 text-sm text-slate-500">{t("dashboard.taskProgress")}</p>
              </div>
            </div>

            <div className="mt-8 flex h-36 items-end gap-3">
              {weeklyData.map(([label, value]) => (
                <div key={label} className="flex-1 text-center">
                  <div className="flex h-28 items-end justify-center">
                    <div data-gsap="bar" data-height={`${value}%`} className="w-full max-w-8 rounded-t-xl bg-linear-to-t from-blue-600 to-blue-400" />
                  </div>
                  <p className="mt-2 text-[10px] font-medium text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-gsap="card" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">{t("dashboard.taskDistribution")}</h2>
                <p className="mt-1 text-sm text-slate-500">{t("dashboard.overview")}</p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {[
                { label: "High Priority", value: "72%", width: "72%", tone: "bg-red-500" },
                { label: "Medium Priority", value: "54%", width: "54%", tone: "bg-yellow-500" },
                { label: "Low Priority", value: "83%", width: "83%", tone: "bg-emerald-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="text-slate-500">{item.value}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div data-gsap="priority-bar" data-width={item.width} className={`h-full rounded-full ${item.tone}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div data-gsap="card" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{t("dashboard.recentTasks")}</h2>
                <p className="text-sm text-slate-500">{t("dashboard.taskProgress")}</p>
              </div>
            </div>

            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.title} data-gsap="task-item" className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-800">{task.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>{task.category}</span>
                      <span>•</span>
                      <span>{task.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${task.priority === "High" ? "bg-red-100 text-red-600" : task.priority === "Medium" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}>
                      {task.priority}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${task.status === "Completed" ? "bg-green-100 text-green-600" : task.status === "In Progress" ? "bg-blue-100 text-blue-600" : "bg-yellow-100 text-yellow-600"}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div data-gsap="card" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{t("dashboard.profile")}</h2>
                <p className="text-sm text-slate-500">{t("dashboard.overview")}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/tasks" className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50">
                <span className="font-medium text-slate-700">{t("nav.tasks")}</span>
                <ArrowUpRight size={16} className="text-slate-400" />
              </Link>
              <Link href="/my-tasks" className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50">
                <span className="font-medium text-slate-700">{t("myTasks.title")}</span>
                <ArrowUpRight size={16} className="text-slate-400" />
              </Link>
              <Link href="/profile" className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:bg-slate-50">
                <span className="font-medium text-slate-700">{t("dashboard.profile")}</span>
                <ArrowUpRight size={16} className="text-slate-400" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
