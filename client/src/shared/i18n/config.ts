import i18n from "i18next";
import languageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

i18n.use(HttpApi)
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        // lng: "en", // if you're using a language detector, do not define the lng option
        fallbackLng: "ru",
        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
        debug: import.meta.env.VITE_ENV === "development",
        keySeparator: ".",
        backend: {
            loadPath: "/locales/{{lng}}.json",
        },
    });

export default i18n;
