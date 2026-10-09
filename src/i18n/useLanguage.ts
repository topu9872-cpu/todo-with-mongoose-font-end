"use client";

import { useTranslation } from "react-i18next";
import { type Language, setLanguage } from "./config";

export function useLanguage() {
  const { i18n } = useTranslation();

  const language = (i18n.resolvedLanguage as Language) || "en";

  const handleLanguageChange = async (nextLanguage: Language) => {
    await setLanguage(nextLanguage);
  };

  return {
    language,
    setLanguage: handleLanguageChange,
    t: i18n.t.bind(i18n),
  };
}
