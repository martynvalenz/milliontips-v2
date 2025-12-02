import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { getCookie } from "cookies-next";
import z from "zod";
import { prisma } from "@/config/db";
import { authMiddleware } from "@/lib/auth-middleware";
import { getDateTime } from "../functions/luxon";

const TrackSchema = z.object({
	event: z.string().min(1),
	domain: z.string().optional(),
	pathname: z.string().optional(),
	timeZone: z.string().min(1),
	platform: z.string().optional(),
	userAgent: z.string().optional(),
	city: z.string().optional(),
	country: z.string().optional(),
	lang: z.string().min(1),
	workspaceId: z.string().optional(),
	params: z.map(z.string(), z.string()).optional(),
});

export const eventTracker = createServerFn({ method: "POST" })
	.inputValidator(TrackSchema)
	.middleware([authMiddleware])
	.handler(async ({ data, context }) => {
		const headersList = await getRequestHeaders();
		const device = (await getCookie("device")) || "unknown";
		const ip = headersList.get("X-Forwarded-For") || "unknown";
		const user = context.user;

		const { date, time } = await getDateTime(data.timeZone);

		const findEvent = await prisma.eventTracker.findFirst({
			where: {
				event: data.event,
				device: device || "unknown",
				user_id: user?.id || null,
				date,
			},
		});

		const botPatterns = [
			/googlebot/i,
			/bingbot/i,
			/msnbot/i,
			/facebot/i,
			/twitterbot/i,
			/linkedinbot/i,
			/pinterestbot/i,
			/instagram/i,
			/tiktok/i,
			/snapchat/i,
			/whatsapp/i,
		];

		const isBot = botPatterns.some((pattern) =>
			pattern.test(data.userAgent || ""),
		);

		if (!findEvent && !isBot) {
			const workspace = await prisma.workspace.findUnique({
				where: {
					id: data.workspaceId || "",
				},
				select: {
					id: true,
				},
			});

			await prisma.eventTracker.create({
				data: {
					event: data.event,
					user_id: user?.id || null,
					device: device || "unknown",
					ip_address: ip || "unknown",
					platform: data.platform,
					time_zone: data.timeZone,
					user_agent: data.userAgent,
					domain: data.domain,
					country: data.country,
					city: data.city,
					pathname: data.pathname,
					date: date || null,
					time: time || null,
					params: data.params ? Object.fromEntries(data.params) : {},
					lang: data.lang,
					workspace_id: workspace?.id || null,
				},
			});
		}

		return;
	});
