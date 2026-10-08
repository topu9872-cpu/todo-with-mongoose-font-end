"use client";

import { useEffect, useState } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold">
                T
              </div>

              <span className="text-2xl font-bold">Todo</span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
              A simple and focused task management app designed to help you
              organize your work, stay focused, and get things done.
            </p>

            <div className="mt-6">
              <a
                href="/tasks"
                className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-500"
              >
                Start Managing Tasks
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white">Product</h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a href="/tasks" className="transition hover:text-white">
                  Tasks
                </a>
              </li>

              <li>
                <a href="/dashboard" className="transition hover:text-white">
                  Dashboard
                </a>
              </li>

              <li>
                <a href="/features" className="transition hover:text-white">
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white">Company</h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a href="/about" className="transition hover:text-white">
                  About
                </a>
              </li>

              <li>
                <a href="/contact" className="transition hover:text-white">
                  Contact
                </a>
              </li>

              <li>
                <a href="/privacy" className="transition hover:text-white">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © {currentYear} Todo. All rights reserved.
          </p>

          <p className="text-sm text-slate-500">
            Built for better productivity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
