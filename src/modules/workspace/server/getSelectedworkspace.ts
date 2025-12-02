import { createServerFn } from "@tanstack/react-start";
import { prisma } from "@/db";
import { authMiddleware } from "@/lib/auth-middleware";

export const getSelectedWorkspace = createServerFn()
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const selectedWorkspace = await prisma.selectedWorkspace.findFirst({
			where: {
				userId: context.user.id,
			},
			select: {
				workspaceId: true,
			},
		});
		return {
			workspaceId: selectedWorkspace?.workspaceId,
		};
	});
