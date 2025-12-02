import { Link, type LinkProps, useParams } from "@tanstack/react-router";
import { config } from "@/i18n/i18n";

export function LocaleLink(props: LinkProps) {
	const params = useParams({ strict: false });
	const currentLocale = params.locale || config.defaultLocale;

	return (
		<Link {...props} params={{ locale: currentLocale }}>
			{props.children}
		</Link>
	);
}
