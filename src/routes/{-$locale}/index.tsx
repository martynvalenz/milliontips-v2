import { createFileRoute, redirect } from "@tanstack/react-router";
import { authServerFunction } from "@/modules/auth/server/authServerFunction";

export const Route = createFileRoute("/{-$locale}/")({
	beforeLoad: async () => {
		// Call the function (which runs through the middleware)
		const { user, session } = await authServerFunction();

		// Handle the redirect logic here
		if (user || session) {
			throw redirect({
				to: "/{-$locale}/main",
			});
		}
	},
	loader: () => {
		throw redirect({
			to: "/{-$locale}/auth/login",
		});
	},
	component: () => null, // Renders nothing, just redirects
});
