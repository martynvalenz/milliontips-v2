import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/{-$locale}/main/layout/workspaces/$workspaceId/",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/-$locale/main/workspaces/$workspaceId/"!</div>;
}
