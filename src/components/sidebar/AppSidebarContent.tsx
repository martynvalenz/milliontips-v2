import { useLocation } from "@tanstack/react-router";
import { useWorkspaceContext } from "@/modules/workspace/context/workspace.context";
import WorkspaceSwitcher from "@/modules/workspace/ui/WorkspaceSwitcher";
import MainNav from "./MainNav";
import SidebarContainer, { SidebarHeader } from "./SidebarContainer";

const AppSidebarContent = () => {
	const { selectedWorkspace } = useWorkspaceContext();
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<SidebarContainer className="h-full">
			<SidebarHeader>
				<WorkspaceSwitcher />
			</SidebarHeader>
			<MainNav />
			{/* <SidebarGroup>
        <SidebarMenu>
          {items
            .filter((item) => item.enabled)
            .map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.url)}
                >
                  <Link href={`${item.url}${item.defaultRoute}`}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarGroup> */}
		</SidebarContainer>
	);
};

export default AppSidebarContent;
