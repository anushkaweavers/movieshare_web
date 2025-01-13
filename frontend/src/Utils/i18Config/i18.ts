import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18LanguageSelect from "./i18LanguageSelect";
// import Backend from "i18next-http-backend";

// import { API_URL } from "../../config";

// this is for from server

// const languageName = localStorage.getItem("langName");

// i18n
//   .use(Backend)
//   .use(initReactI18next)
//   .init({
//     lng: "en", // Set the default language
//     fallbackLng: "en", // Fallback language if translation for selected locale is not available
//     backend: {
//       loadPath:
//         `${API_URL}/page-content/get-page-contents/en`, // Endpoint to fetch translations from the backend
//     },
//   });

// this is for from local

i18n.use(initReactI18next).init({
  // lng: languageName,
  lng: "en", // Set the default language
  fallbackLng: "en", // Fallback language if translation for selected locale is not available
  resources: {
    en: {
      translation: i18LanguageSelect.en,
    },
    sp: {
      translation: i18LanguageSelect.sp,
    },
  },
});

export default i18n;

/**
 * use Case 
 * to use the lang add lang to specific json
 * 
  const { t } = useTranslation();
 * 
 * 
 */
