import { createFileRoute } from "@tanstack/react-router";
import { getSeo } from "@/modules/core/functions/getSeo";

export const Route = createFileRoute("/{-$locale}/main/layout/user/")({
	loader: ({ params }) => {
		const locale = params.locale;
		return locale;
	},
	head: ({ params }) => ({
		meta: getSeo({ title: params.locale === "es" ? "Usuario" : "User" }),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/-$locale/main/workspaces/user/"!</div>;
}
