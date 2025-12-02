import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/main/")({
	// We hook into beforeLoad or loader to redirect immediately
	loader: async ({ context }) => {
		// We can access the parent loader data via context if we passed it,
		// OR simply grab the data from the hook/route context in the component.
		// However, the cleanest server-side friendly way is to check the cache or context.

		// NOTE: To access parent loader data here cleanly without refetching,
		// you can use `context` in the parent beforeLoad, OR just rely on
		// the fact that your server function `getSelectedWorkspace` is likely cached/deduped.

		// Let's assume we can get the data from the parent route match or re-fetch (deduped)
		const { selectedWorkspace } = context;
		// *If accessing parent loader promise is tricky in your version, simply call getSelectedWorkspace() again*

		if (selectedWorkspace.workspaceId) {
			throw redirect({
				to: "/{-$locale}/main/layout/workspaces/$workspaceId",
				params: { workspaceId: selectedWorkspace.workspaceId },
			});
		} else {
			throw redirect({
				to: "/{-$locale}/main/layout/user",
			});
		}
	},
	component: () => null, // Renders nothing, just redirects
});
