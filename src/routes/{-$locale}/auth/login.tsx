import { createFileRoute } from "@tanstack/react-router";
import TrackerComponent from "@/components/shared/TrackerComponent";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/modules/auth/ui/LoginForm";
import SocialLogin from "@/modules/auth/ui/SocialLogin";
import { getSeo } from "@/modules/core/functions/getSeo";

export const Route = createFileRoute("/{-$locale}/auth/login")({
	loader: ({ params }) => {
		const locale = params.locale;
		return locale;
	},
	head: ({ params }) => ({
		meta: getSeo({
			title: params.locale === "es" ? "Iniciar sesión" : "Login",
		}),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const params = Route.useParams();
	const locale = params.locale;

	return (
		<Card className="w-full max-w-md">
			<CardHeader className="bg-card">
				<CardTitle className="text-xl">
					{locale === "es" ? "Iniciar sesión" : "Login"}
				</CardTitle>
				<CardDescription>
					{locale === "es"
						? "Inicia sesión con tu cuenta"
						: "Login with your account"}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<SocialLogin />
				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
					<span className="relative z-10 bg-card px-2 text-muted-foreground">
						{locale === "es" ? "o" : "or"}
					</span>
				</div>
				<LoginForm />
				<TrackerComponent event="login-page" />
				{/* <div className="mt-4 text-center text-sm">
					{locale === "es"
						? "¿No tienes una cuenta?"
						: "Don't have an account?"}{" "}
					<Link
						to="/{-$locale}/auth/register"
						className="font-medium text-app-800 underline dark:text-slate-200"
					>
						{locale === "es" ? "Regístrate" : "Register"}
					</Link>
				</div> */}
			</CardContent>
		</Card>
	);
}
