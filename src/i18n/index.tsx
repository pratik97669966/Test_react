import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';

import translateEN from './en.json';

const resources = {
  en: {
    translation: translateEN,
  },
};

export const defaultLanguage = 'en';

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    // lng:'en',
    // keySeparator:false, // We do not use keys in form messages.welcome
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
      skipOnVariables: true,
    },
  });

export default i18n;

export const getLanguageTranslate = (key: any, values: any = {}) => {
  return i18n.t(key, values);
};
