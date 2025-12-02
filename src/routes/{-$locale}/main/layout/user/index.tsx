import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/main/layout/user/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/-$locale/main/workspaces/user/"!</div>;
}
