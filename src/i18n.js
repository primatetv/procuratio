import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import es from './locales/es.json';
import en from './locales/en.json';
import it from './locales/it.json';

i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'es',
        // default to 'es' if no language is detected or stored
        // order: ['localStorage', 'cookie'] ensures we check storage first, but skip 'navigator' to avoid browser language
        detection: {
            order: ['localStorage', 'cookie'],
            caches: ['localStorage', 'cookie'],
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            es: {
                translation: es
            },
            en: {
                translation: en
            },
            it: {
                translation: it
            }
        }
    });

export default i18n;
