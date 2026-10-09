"use client";

import { useState } from "react";
import {
  Settings,
  Palette,
  Languages,
  Moon,
  Sun,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import BackToBack from "@/src/Components/BackToBack";
import { useTheme } from "@/src/app/providers";
import { useLanguage } from "@/src/i18n/useLanguage";

export default function SettingsPageClient() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <main className="bg-slate-50 p-4 sm:p-6 lg:p-8">
      <BackToBack />
      <div className="min-h-screen ">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Settings size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {t("settings.pageTitle")}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {t("settings.pageSubtitle")}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 border-b border-slate-100 p-5">
                <Palette size={20} className="text-blue-600" />
                <div>
                  <h2 className="font-semibold text-slate-900">{t("settings.appearance")}</h2>
                  <p className="text-sm text-slate-500">{t("settings.appearanceDesc")}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-slate-800">{t("settings.theme")}</p>
                  <p className="mt-1 text-sm text-slate-500">{t("settings.themeDesc")}</p>
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
                    {t("settings.light")}
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
                    {t("settings.dark")}
                  </button>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3 border-b border-slate-100 p-5">
                <Languages size={20} className="text-blue-600" />
                <div>
                  <h2 className="font-semibold text-slate-900">
                    {t("settings.regionalPreferences")}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {t("settings.regionalPreferencesDesc")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-slate-800">{t("settings.languagePreference")}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {t("settings.languagePreferenceDesc")}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => void setLanguage("en")}
                    aria-pressed={language === "en"}
                    className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                      language === "en"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {t("common.english")}
                  </button>

                  <button
                    type="button"
                    onClick={() => void setLanguage("bn")}
                    aria-pressed={language === "bn"}
                    className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                      language === "bn"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {t("common.bangla")}
                  </button>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-red-200 bg-white">
              <div className="flex items-center gap-3 border-b border-red-100 p-5">
                <Trash2 size={20} className="text-red-600" />
                <div>
                  <h2 className="font-semibold text-red-700">{t("settings.dangerZone")}</h2>
                  <p className="text-sm text-slate-500">{t("settings.dangerZoneDesc")}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-slate-800">{t("settings.deleteAccount")}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {t("settings.deleteAccountDesc")}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setConfirmDelete(!confirmDelete)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  {t("settings.deleteAccount")}
                </button>
              </div>

              {confirmDelete && (
                <div className="border-t border-red-100 bg-red-50/50 p-5">
                  <p className="text-sm font-medium text-red-800">
                    {t("settings.accountDeletionNote")}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {t("settings.accountDeletionDetail")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
                  >
                    <RotateCcw size={15} />
                    {t("settings.cancel")}
                  </button>
                </div>
              )}
            </section>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            {t("settings.taskflowSettings")}
          </p>
        </div>
      </div>
    </main>
  );
}
