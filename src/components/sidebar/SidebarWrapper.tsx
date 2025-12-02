import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSidebarWrapper } from "./useSidebarWrapper";

const SidebarWrapper = ({ children }: { children: ReactNode }) => {
	const { isSidebarOpen } = useSidebarWrapper();

	return (
		<div
			className={cn(
				"flex flex-1 transition-all duration-300 ease-in-out ml-0",
				isSidebarOpen ? "md:ml-50" : "md:ml-12",
			)}
		>
			{children}
		</div>
	);
};

export default SidebarWrapper;
