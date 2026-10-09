"use client";

import { useState } from "react";
import {
  Settings,
  Palette,

  Globe,
  Moon,
  Sun,
  Trash2,
  RotateCcw,
} from "lucide-react";
import BackToBack from "@/src/Components/BackToBack";

export default function SettingsPage() {
  const [theme, setTheme] = useState("light");
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <main className="bg-slate-50 p-4 sm:p-6 lg:p-8">
        <BackToBack />
         <div className="min-h-screen ">
      <div className="mx-auto max-w-4xl">
       
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Settings size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Settings
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Customize your TaskFlow experience.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center gap-3 border-b border-slate-100 p-5">
              <Palette size={20} className="text-blue-600" />
              <div>
                <h2 className="font-semibold text-slate-900">Appearance</h2>
                <p className="text-sm text-slate-500">
                  Customize how TaskFlow looks.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-slate-800">Theme</p>
                <p className="mt-1 text-sm text-slate-500">
                  Choose your preferred appearance.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                    theme === "light"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Sun size={17} />
                  Light
                </button>

                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                    theme === "dark"
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Moon size={17} />
                  Dark
                </button>
              </div>
            </div>
          </section>

          {/* Regional Preferences */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center gap-3 border-b border-slate-100 p-5">
              <Globe size={20} className="text-blue-600" />
              <div>
                <h2 className="font-semibold text-slate-900">
                  Regional Preferences
                </h2>
                <p className="text-sm text-slate-500">
                  Set your preferred language and region.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-slate-800">Language</p>
                <p className="mt-1 text-sm text-slate-500">
                  Choose the language for your interface.
                </p>
              </div>

              <select
                defaultValue="en"
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="en">English</option>
                <option value="bn">বাংলা</option>
              </select>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="overflow-hidden rounded-2xl border border-red-200 bg-white">
            <div className="flex items-center gap-3 border-b border-red-100 p-5">
              <Trash2 size={20} className="text-red-600" />
              <div>
                <h2 className="font-semibold text-red-700">Danger Zone</h2>
                <p className="text-sm text-slate-500">
                  Manage irreversible account actions.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-slate-800">Delete account</p>
                <p className="mt-1 text-sm text-slate-500">
                  Permanently remove your account and its data.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setConfirmDelete(!confirmDelete)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete account
              </button>
            </div>

            {confirmDelete && (
              <div className="border-t border-red-100 bg-red-50/50 p-5">
                <p className="text-sm font-medium text-red-800">
                  Account deletion is not connected yet.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Connect your authentication provider and backend before
                  enabling permanent deletion.
                </p>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  <RotateCcw size={15} />
                  Cancel
                </button>
              </div>
            )}
          </section>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          TaskFlow Settings
        </p>
      </div>
      </div>
    </main>
  );
}
