import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { I18nextProvider } from "react-i18next";
import i18n, { config, initializeI18n } from "@/i18n/i18n";

export const Route = createFileRoute("/{-$locale}")({
	// 1. Validation: If user goes to /fr/about (unsupported), redirect or fallback
	beforeLoad: ({ params }) => {
		const locale = params.locale;

		// If locale is present but not supported, redirect to default (or 404)
		if (locale && !config.locales.includes(locale as "en" | "es")) {
			throw redirect({ to: "/{-$locale}" });
		}
	},

	// 2. Loader: Initialize i18n on the server (or client) before rendering
	loader: async ({ params }) => {
		const locale = params.locale || config.defaultLocale;
		initializeI18n(locale);

		// Pass the locale and translation data to the component
		return {
			locale,
		};
	},

	// 3. Component: Wrap children in the Provider
	component: () => {
		return (
			<I18nextProvider i18n={i18n}>
				<Outlet />
			</I18nextProvider>
		);
	},
});
