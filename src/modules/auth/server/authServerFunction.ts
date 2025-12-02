import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth-middleware";

export const authServerFunction = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		return {
			user: context.user,
			session: context.session,
		};
	});
