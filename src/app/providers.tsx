
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { getStoredLanguage } from "@/src/i18n/config";

type ThemeMode = "light" | "dark";

const ThemeContext = createContext<{
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}>({
  theme: "light",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const storedLanguage = getStoredLanguage();
    document.documentElement.lang = storedLanguage;

    if (i18n.resolvedLanguage !== storedLanguage) {
      void i18n.changeLanguage(storedLanguage);
    }

    const savedTheme = (localStorage.getItem("theme") as ThemeMode | null) || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    setMounted(true);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [mounted, theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  if (!ready) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </I18nextProvider>
  );
}