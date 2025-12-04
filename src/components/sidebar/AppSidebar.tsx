"use client";

import { cn } from "@/lib/utils";
import AppSidebarContent from "./AppSidebarContent";
import { useSidebarWrapper } from "./useSidebarWrapper";

const AppSidebar = () => {
	const { isExpanded, setIsExpanded, isSidebarOpen } = useSidebarWrapper();

	return (
		<aside
			className={cn(
				"hidden md:flex flex-col fixed left-0 h-full bg-background shadow-none z-40 transition-all duration-300 my-auto",
				isSidebarOpen ? "w-50" : "w-12",
				isExpanded &&
					!isSidebarOpen &&
					"w-60 shadow-xl z-50 border-r rounded-r-xl bg-sidebar",
			)}
			onMouseEnter={() => {
				if (!isSidebarOpen) {
					setIsExpanded(true);
				}
			}}
			onMouseLeave={() => {
				if (!isSidebarOpen) {
					setIsExpanded(false);
				}
			}}
		>
			<nav className="flex flex-col h-full">
				<AppSidebarContent />
			</nav>
		</aside>
	);
};

export default AppSidebar;
