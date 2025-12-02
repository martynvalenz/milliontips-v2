import { type BetterAuthOptions, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession, username } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { prisma } from "@/config/db";

const options = {
	database: prismaAdapter(prisma, {
		provider: "postgresql", // or "mysql", "postgresql", ...etc
	}),
	session: {
		expiresIn: 60 * 60 * 24 * 30, // 30 days
		updateAge: 60 * 60 * 24 * 10, // 10 days (every 10 days the session expiration is updated)
	},
	advanced: {
		database: {
			generateId: false,
		},
	},
	account: {
		accountLinking: {
			enabled: true,
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			// accessType: "offline",
			prompt: "select_account consent",
		},
	},
	user: {
		additionalFields: {
			user_type: {
				type: "string",
				required: true,
				defaultValue: "USER",
			},
			color: {
				type: "string",
				required: true,
				defaultValue: "#2655FFFF",
			},
		},
	},
	plugins: [tanstackStartCookies(), username()],
} satisfies BetterAuthOptions;

export const auth = betterAuth({
	...options,
	plugins: [
		...(options.plugins ?? []),
		customSession(async ({ user, session }) => {
			return {
				session: {
					expiresAt: session.expiresAt,
					token: session.token,
					userAgent: session.userAgent,
				},
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
					createdAt: user.createdAt,
					user_type: user.user_type,
					color: user.color,
				},
			};
		}, options),
	],
});
