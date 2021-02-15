import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import twResource from '../locales/tw';

const resources = {
  tw: {
    ...twResource,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tw',
    keySeparator: true,
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
  });

export default i18n;
