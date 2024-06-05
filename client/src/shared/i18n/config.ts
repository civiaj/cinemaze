import i18n from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import { lngs } from "./types";

i18n.use(HttpApi)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: [...Object.values(lngs).map((v) => v.value)],
        fallbackLng: "ru",
        interpolation: {
            escapeValue: false,
        },
        debug: import.meta.env.VITE_ENV === "development",
        keySeparator: ".",
        backend: {
            loadPath: "/locales/{{lng}}.json",
        },
    });

export default i18n;
