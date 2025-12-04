import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, WalletCards } from "lucide-react";
import { useLocale } from "@/modules/core/hooks/useLocale";
import { useWorkspaceContext } from "@/modules/workspace/context/workspace.context";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "./SidebarContainer";

const MainNav = () => {
	const { selectedWorkspace } = useWorkspaceContext();
	const location = useLocation();
	const pathname = location.pathname;
	const lang = useLocale();

	const catalogs = [
		{
			title: lang === "es" ? "Inicio" : "Home",
			url: `/main/workspaces/${selectedWorkspace}`,
			icon: LayoutDashboard,
			disabled: false,
			isExact: true,
		},
		{
			title: lang === "es" ? "Cuentas" : "Accounts",
			url: `/main/workspaces/${selectedWorkspace}/accounts`,
			icon: WalletCards,
			disabled: false,
			isExact: true,
		},
	];

	return (
		<SidebarGroup>
			<SidebarGroupLabel>
				{lang === "es" ? "Principal" : "Main"}
			</SidebarGroupLabel>
			<SidebarMenu>
				{catalogs
					.filter((item) => !item.disabled)
					.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								asChild
								isActive={
									item.isExact
										? pathname === item.url
										: pathname.startsWith(item.url)
								}
							>
								<Link to={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
			</SidebarMenu>
		</SidebarGroup>
	);
};

export default MainNav;
