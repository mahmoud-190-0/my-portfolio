import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";

const savedLanguage = "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = savedLanguage;

// Keep the overall page direction fixed.
// RTL will be applied only to translated sections.
document.documentElement.dir = "ltr";

i18n.on("languageChanged", (language) => {
  document.documentElement.lang = language;

  // Do not change the direction of the entire website.
  // localStorage.setItem("portfolio-language", language);
});

export default i18n;
