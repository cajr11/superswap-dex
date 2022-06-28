import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, es } from "./translations"

i18n.use(initReactI18next).init({
    debug: true,
    resources: {
        en,
        es
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    }
})

export default i18n;
