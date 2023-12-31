import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from './resources';
import { I18nManager } from "react-native";
import { getLocales } from "react-native-localize";

export const defoult_language = getLocales()[0].languageCode;
console.warn(defoult_language)




i18n.use(initReactI18next).init({
    resources,
    lng: defoult_language,
    fallbackLng: 'en',
    interpolariton: {
        escapeValue: false,
    }
})
export const isRTL = i18n.dir() === 'rtl';
I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export default i18n;