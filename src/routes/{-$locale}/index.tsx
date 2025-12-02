import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LocaleLink } from "@/components/shared/LocaleLink";

export const Route = createFileRoute("/{-$locale}/")({
	component: Home,
});

function Home() {
	const { t } = useTranslation();

	return (
		<div className="p-2">
			<h3>{t("title")}</h3>
			<LocaleLink to="/{-$locale}/auth/login">Login</LocaleLink>
		</div>
	);
}
