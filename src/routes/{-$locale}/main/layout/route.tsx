import { createFileRoute, Outlet } from "@tanstack/react-router";
import AppSidebar from "@/components/sidebar/AppSidebar";
import SidebarWrapper from "@/components/sidebar/SidebarWrapper";

export const Route = createFileRoute("/{-$locale}/main/layout")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-screen">
			<div className="group/layout shrink-0 hidden md:block">
				<AppSidebar />
			</div>
			<SidebarWrapper>
				<div className="flex-1 flex flex-col h-screen overflow-hidden">
					{/* <AppHeader /> */}
					<div className="h-full w-full flex-1 pt-12 md:pt-0 overflow-hidden">
						<div className="h-full flex">
							<Outlet />
						</div>
					</div>
				</div>
			</SidebarWrapper>
		</div>
	);
}
