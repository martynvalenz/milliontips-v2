import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json"; // specific to your structure
import es from "./locales/es.json";

// Define available languages
export const config = {
	defaultLocale: "en",
	locales: ["en", "es"] as const,
};

export type Locale = (typeof config.locales)[number];

export function initializeI18n(initialLocale: string) {
	// If already initialized, just change language
	if (i18n.isInitialized) {
		if (i18n.language !== initialLocale) {
			i18n.changeLanguage(initialLocale);
		}
		return i18n;
	}

	// Initialize fresh instance
	i18n.use(initReactI18next).init({
		lng: initialLocale,
		fallbackLng: config.defaultLocale,
		supportedLngs: config.locales,
		resources: {
			en: { translation: en },
			es: { translation: es },
		},
		interpolation: {
			escapeValue: false, // React handles escaping
		},
		// Important for hydration: disable suspense during server render if possible
		react: {
			useSuspense: false,
		},
	});

	return i18n;
}

export default i18n;
