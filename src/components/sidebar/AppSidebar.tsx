"use client";

import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { cn } from "@/lib/utils";
import logo from "/img/favicon-180.png";
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
				<Link to="/{-$locale}/main">
					<Image
						src={logo}
						alt="Logo"
						width={isExpanded || isSidebarOpen ? 150 : 35}
						height={isExpanded || isSidebarOpen ? 100 : 35}
						className={cn(
							"mb-4 mt-2 flex hover:opacity-80",
							isExpanded || isSidebarOpen ? "ml-4" : "mx-auto",
						)}
					/>
				</Link>
				{/* <AppSidebarContent /> */}
			</nav>
		</aside>
	);
};

export default AppSidebar;
