import {
	customSessionClient,
	inferAdditionalFields,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export const getBaseURL = () => {
	if (typeof window === "undefined") return ""; // SSR safeguard

	const hostname = window.location.hostname;
	const protocol = window.location.protocol;
	return `${protocol}//${hostname}/api`; // or any API path you use
};

const authClient = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL,
	plugins: [
		inferAdditionalFields<typeof auth>(),
		customSessionClient<typeof auth>(),
		usernameClient(),
	],
});

export const {
	signIn,
	signUp,
	useSession,
	getSession,
	signOut,
	requestPasswordReset,
	resetPassword,
	sendVerificationEmail,
} = authClient;
