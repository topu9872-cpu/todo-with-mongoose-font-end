"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold">
                T
              </div>

              <span className="text-2xl font-bold">{t("common.appName")}</span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
              {t("footer.description")}
            </p>

            <div className="mt-6">
              <a
                href="/tasks"
                className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
              >
                {t("footer.startManagingTasks")}
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">{t("footer.product")}</h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a href="/tasks" className="transition hover:text-white">
                  {t("nav.tasks")}
                </a>
              </li>

              <li>
                <a href="/dashboard" className="transition hover:text-white">
                  {t("nav.dashboard")}
                </a>
              </li>

              <li>
                <a href="/about" className="transition hover:text-white">
                  {t("footer.features")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">{t("footer.company")}</h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a href="/about" className="transition hover:text-white">
                  {t("nav.about")}
                </a>
              </li>

              <li>
                <a href="/contact" className="transition hover:text-white">
                  {t("footer.contact")}
                </a>
              </li>

              <li>
                <a href="/privacy" className="transition hover:text-white">
                  {t("footer.privacy")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © {currentYear} {t("common.appName")}. {t("footer.rightsReserved")}
          </p>

          <p className="text-sm text-slate-500">
            {t("footer.builtForProductivity")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
