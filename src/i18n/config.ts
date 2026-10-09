import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

export type Language = "en" | "bn";

export const defaultLanguage: Language = "en";

export const supportedLanguages: Language[] = ["en", "bn"];

export const getStoredLanguage = (): Language => {
  if (typeof window === "undefined") {
    return defaultLanguage;
  }

  const savedLanguage = localStorage.getItem("language");

  if (savedLanguage === "bn" || savedLanguage === "en") {
    return savedLanguage;
  }

  return defaultLanguage;
};

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    interpolation: {
      escapeValue: false,
    },
    defaultNS: "translation",
    ns: ["translation"],
    react: {
      useSuspense: false,
    },
  });
}

export const setLanguage = async (language: Language) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }

  await i18next.changeLanguage(language);
};

export default i18next;
