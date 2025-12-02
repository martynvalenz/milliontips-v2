import { z } from "zod";
import { langMessages } from "@/modules/core/functions/message.validations";

export const signUpSchema = (lang: keyof typeof langMessages) => {
	const msg = langMessages[lang];
	return z.object({
		email: z
			.string({
				message: msg.required,
			})
			.email({
				message: msg.email,
			}),
		// username:requiredString.regex(/^[a-zA-Z0-9_-]*$/, "Only letters, numbers, and underscores"),
		name: z
			.string({
				message: msg.required,
			})
			.trim()
			.min(1, msg.required),
		password: z
			.string({
				message: msg.required,
			})
			.min(8, msg.min(8)),
	});
};

export type SignUpVaues = z.infer<ReturnType<typeof signUpSchema>>;

export const loginSchema = (lang: keyof typeof langMessages) => {
	const msg = langMessages[lang];
	return z.object({
		username: z.string().min(1, msg.required).max(100, msg.max(100)),
		password: z.string().min(8, msg.min(8)),
	});
};

export type LoginValues = z.infer<ReturnType<typeof loginSchema>>;

export const signUpSchemaWithUsername = (lang: keyof typeof langMessages) => {
	const msg = langMessages[lang];
	return z.object({
		username: z.string().min(1, msg.required).max(20, msg.max(20)),
		name: z.string().min(1, msg.required).max(50, msg.max(50)),
		password: z.string().min(8, msg.min(8)).max(20, msg.max(20)),
	});
};

export type SignUpVauesWithUsername = z.infer<
	ReturnType<typeof signUpSchemaWithUsername>
>;

export const loginSchemaWithEmail = (lang: keyof typeof langMessages) => {
	const msg = langMessages[lang];
	return z.object({
		email: z
			.string({
				message: msg.required,
			})
			.trim()
			.min(1, msg.required)
			.email({
				message: msg.email,
			}),
		password: z
			.string({
				message: msg.required,
			})
			.min(8, msg.min(8)),
	});
};

export type LoginValuesWithEmail = z.infer<
	ReturnType<typeof loginSchemaWithEmail>
>;

export const loginSchemaWithUsername = (lang: keyof typeof langMessages) => {
	const msg = langMessages[lang];
	return z.object({
		username: z.string().min(1, msg.required).max(20, msg.max(20)),
		password: z.string().min(8, msg.min(8)),
	});
};

export type LoginValuesWithUsername = z.infer<
	ReturnType<typeof loginSchemaWithUsername>
>;

export const forgotPasswordSchema = (lang: keyof typeof langMessages) => {
	const msg = langMessages[lang];
	return z.object({
		email: z
			.string({
				message: msg.required,
			})
			.trim()
			.min(1, msg.required)
			.email({
				message: msg.email,
			}),
	});
};

export type ForgotPasswordValues = z.infer<
	ReturnType<typeof forgotPasswordSchema>
>;

export const createNewPasswordSchema = (lang: keyof typeof langMessages) => {
	const msg = langMessages[lang];
	return z.object({
		password: z.string().min(8, msg.min(8)),
	});
};

export type CreateNewPasswordValues = z.infer<
	ReturnType<typeof createNewPasswordSchema>
>;

export const updatePasswordSchema = (lang: keyof typeof langMessages) => {
	const msg = langMessages[lang];
	return z.object({
		oldPassword: z.string().min(8, msg.min(8)),
		password: z.string().min(8, msg.min(8)),
	});
};

export type UpdatePasswordValues = z.infer<
	ReturnType<typeof updatePasswordSchema>
>;

export const verifyEmailSchema = (lang: keyof typeof langMessages) => {
	const msg = langMessages[lang];
	return z.object({
		token: z.string().min(1, msg.required),
		code: z.string().min(1, msg.required),
	});
};

export type VerifyEmailValues = z.infer<ReturnType<typeof verifyEmailSchema>>;

export const updateUserEmailSchema = (lang: keyof typeof langMessages) => {
	const msg = langMessages[lang];
	return z.object({
		email: z.string().min(1, msg.required).email({ message: msg.email }),
	});
};

export type UpdateUserEmailValues = z.infer<
	ReturnType<typeof updateUserEmailSchema>
>;
