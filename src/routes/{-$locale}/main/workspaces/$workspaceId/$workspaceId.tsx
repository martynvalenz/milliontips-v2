import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/{-$locale}/main/workspaces/$workspaceId/$workspaceId",
)({
	component: WorkspaceLayout,
});

function WorkspaceLayout() {
	return <Outlet />;
}
