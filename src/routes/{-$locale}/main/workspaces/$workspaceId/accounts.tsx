import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/{-$locale}/main/workspaces/$workspaceId/accounts",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/-$locale/main/workspaces/$workspaceId/accounts"!</div>;
}
