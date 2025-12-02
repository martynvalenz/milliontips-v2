import { useParams } from "@tanstack/react-router";
import { config } from "@/i18n/i18n";

export const useLocale = () => {
	const params = useParams({ strict: false });
	const currentLocale = params.locale || config.defaultLocale;
	return currentLocale;
};
