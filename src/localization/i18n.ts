import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

import en from './locales/en.json';
import ta from './locales/ta.json';
import hi from './locales/hi.json';

const resources = {
  en: { translation: en },
  ta: { translation: ta },
  hi: { translation: hi },
};

// Detect phone's language, fall back to English if it's not one of ours
const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? 'en';
const supportedLanguages = ['en', 'ta', 'hi'];
const initialLanguage = supportedLanguages.includes(deviceLanguage) ? deviceLanguage : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });
export const changeLanguage = (lang: 'en' | 'ta' | 'hi') => {
  i18n.changeLanguage(lang);
};
export default i18n;
