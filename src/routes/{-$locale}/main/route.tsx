import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authServerFunction } from "@/modules/auth/server/authServerFunction";
import { WorkspaceProvider } from "@/modules/workspace/context/workspace.context";
import { getSelectedWorkspace } from "@/modules/workspace/server/getSelectedworkspace";

export const Route = createFileRoute("/{-$locale}/main")({
	beforeLoad: async ({ location }) => {
		// Call the function (which runs through the middleware)
		const { user, session } = await authServerFunction();

		// Handle the redirect logic here
		if (!user || !session) {
			throw redirect({
				to: "/{-$locale}/auth/login",
				search: {
					redirect: location.href,
				},
			});
		}
		const selectedWorkspace = await getSelectedWorkspace();
		// Return context to child routes
		return { user, selectedWorkspace };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { selectedWorkspace } = Route.useRouteContext();
	return (
		<WorkspaceProvider
			initialWorkspaceId={selectedWorkspace.workspaceId || null}
		>
			<Outlet />
		</WorkspaceProvider>
	);
}
