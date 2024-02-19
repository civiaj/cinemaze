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
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
    });

export default i18n;

// "counter_one": "Die Sprache wurde erst ein mal gewechselt",
// "counter_other": "Die Sprache wurde {{count}} mal gewechselt",
// "footer": {
//     "date": "Heute ist {{date, DATE_HUGE}}",
//     "date_morning": "Guten Morgen! Heute ist {{date, DATE_HUGE}} | Wünsche einen schönen Tag!",
//     "date_afternoon": "Guten Tag! Es ist {{date, DATE_HUGE}}",
//     "date_evening": "Guten Abend! Heute war {{date, DATE_HUGE}}"
// }
