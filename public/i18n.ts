import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation from './locales/en/translation.json';

const createI18n = () => {
  return i18next.use(initReactI18next).init({
    lng: 'en',
    debug: true,
    resources: {
      en: {
        translation,
      },
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
};

export default createI18n;
