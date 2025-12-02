import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AlertBanner from "@/components/shared/AlertBanner";
import { PasswordInput } from "@/components/shared/PasswordInput";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";
import { signIn } from "@/lib/auth-client";
import {
	type LoginValues,
	loginSchema,
} from "@/modules/auth/validations/auth.validations";
import { validateEmail } from "@/modules/core/functions/validateEmail";
import { useLocale } from "@/modules/core/hooks/useLocale";

interface SignInFormProps {
	username?: string;
	domain?: string;
}

const LoginForm = ({ username, domain }: SignInFormProps) => {
	const lang = useLocale();
	const email = username && domain ? `${username}@${domain}` : "";
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Initialize Router Hooks
	const navigate = useNavigate();
	// strict: false allows us to access params even if this component isn't a direct route child
	const params = useParams({ strict: false });

	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema(lang)),
		defaultValues: {
			username: email || "",
			password: "",
		},
	});

	const onSubmit = async (values: LoginValues) => {
		setError("");
		setIsPending(true);
		const isValidEmail = validateEmail(values.username);

		if (isValidEmail) {
			const { error } = await signIn.email({
				email: values.username.trim(),
				password: values.password.trim(),
				rememberMe: true,
				callbackURL: DEFAULT_LOGIN_REDIRECT,
			});
			if (error) {
				setError(
					lang === "en"
						? "Invalid credentials"
						: "Las credenciales son incorrectas",
				);
				setIsPending(false);
			} else {
				toast.success(
					lang === "en" ? "Welcome back" : "Bienvenido/a de nuevo",
					{
						position: "top-right",
					},
				);
				navigate({
					to: `${params.locale}/${DEFAULT_LOGIN_REDIRECT}`,
					replace: true,
				});
			}
		} else {
			const { error } = await signIn.username({
				username: values.username.trim(),
				password: values.password.trim(),
			});

			if (error) {
				setError(
					lang === "en"
						? "Invalid credentials"
						: "Las credenciales son incorrectas",
				);
				setIsPending(false);
			} else {
				toast.success(
					lang === "en" ? "Welcome back" : "Bienvenido/a de nuevo",
					{
						position: "top-right",
					},
				);
				navigate({
					to: `${params.locale}/${DEFAULT_LOGIN_REDIRECT}`,
					replace: true,
				});
			}
		}
	};

	const isEmail = validateEmail(form.getValues("username"));

	const handleForgotPassword = () => {
		const name = form.getValues("username").split("@")[0]
			? `${form.getValues("username").split("@")[0]}`
			: "";
		const domain = form.getValues("username").split("@")[1]
			? `${form.getValues("username").split("@")[1]}`
			: "";
		navigate({
			to: `${params.locale}/auth/forgot-password?name=${name}&domain=${domain}`,
			replace: true,
		});
	};

	return (
		<div>
			<Form {...form}>
				<form className="grid gap-3" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{lang === "en" ? "Email" : "Correo electrónico"}
								</FormLabel>
								<FormControl>
									<Input
										className="h-10"
										{...field}
										type={isEmail ? "email" : "text"}
										inputMode={isEmail ? "email" : "text"}
										autoComplete={isEmail ? "email" : "text"}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{lang === "en" ? "Password" : "Contraseña"}
								</FormLabel>
								<FormControl>
									<PasswordInput className="h-10" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-end">
						<Button variant="link" type="button" onClick={handleForgotPassword}>
							{lang === "en" ? "Forgot my password" : "Olvidé mi contraseña"}
						</Button>
					</div>
					{error && <AlertBanner title={error} variant="destructive" />}
					<Button
						type="submit"
						className="w-full"
						size="lg"
						disabled={isPending}
					>
						{isPending ? (
							<div className="flex items-center gap-2">
								<Spinner />
								{lang === "en" ? "Loading..." : "Cargando..."}
							</div>
						) : lang === "en" ? (
							"Login"
						) : (
							"Iniciar sesión"
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
