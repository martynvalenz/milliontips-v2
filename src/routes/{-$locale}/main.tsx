import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import Navbar from "@/components/shared/Navbar";
import OverlayLoader from "@/components/shared/OverlayLoader";
import { authServerFunction } from "@/modules/auth/server/authServerFunction";

export const Route = createFileRoute("/{-$locale}/main")({
	beforeLoad: async ({ location }) => {
		// Call the function (which runs through the middleware)
		const { user, session } = await authServerFunction();

		// Handle the redirect logic here
		if (!user || !session) {
			throw redirect({
				to: "/{-$locale}/auth/login",
				search: {
					redirect: location.href,
				},
			});
		}

		// Return context to child routes
		return { user };
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative flex min-h-svh flex-col bg-sidebar dark:bg-background">
			<Navbar />
			<div className="h-screen flex flex-col items-center justify-center">
				<div className="flex w-full max-w-sm flex-col gap-6">
					<Link
						to="/{-$locale}"
						className="flex items-center justify-center gap-2 self-center font-medium hover:opacity-80"
					>
						{/* <Image
              src={env.NEXT_PUBLIC_APP_LOGO}
              alt="ProfitDent"
              width={250}
              height={250}
            /> */}
					</Link>
					<Outlet />
					{/* <div className="text-center text-balance text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </div> */}
				</div>
			</div>
			<OverlayLoader />
		</div>
	);
}
