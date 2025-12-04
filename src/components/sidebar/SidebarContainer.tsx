import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/modules/core/hooks/useViewports";
import { useSidebarWrapper } from "./useSidebarWrapper";

const SidebarContainer = ({ className, ...props }: ComponentProps<"div">) => {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={cn(
				"flex min-h-0 flex-1 flex-col gap-1 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
				className,
			)}
			{...props}
		/>
	);
};

export default SidebarContainer;

const SidebarGroup = ({ className, ...props }: ComponentProps<"div">) => {
	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={cn(
				"relative flex w-full min-w-0 flex-col px-2 py-1 gap-1",
				className,
			)}
			{...props}
		/>
	);
};

const SidebarGroupLabel = ({ className, ...props }: ComponentProps<"div">) => {
	const { isSidebarOpen, isExpanded } = useSidebarWrapper();
	const isMobile = useIsMobile();

	if (isSidebarOpen || isExpanded || isMobile) {
		return (
			<div
				data-slot="sidebar-group-label"
				data-sidebar="group-label"
				className={cn(
					"text-muted-foreground ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
					className,
				)}
				{...props}
			/>
		);
	}
	return null;
};

const SidebarMenu = ({ className, ...props }: ComponentProps<"ul">) => {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={cn("flex w-full min-w-0 flex-col gap-1", className)}
			{...props}
		/>
	);
};

const SidebarMenuItem = ({ className, ...props }: ComponentProps<"li">) => {
	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={cn("group/menu-item relative", className)}
			{...props}
		/>
	);
};

const sidebarMenuButtonVariants = cva(
	"peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar data-[active=true]:border data-[active=true]:shadow-sm data-[active=true]:font-medium data-[active=true]:text-primary data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				outline:
					"bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
			},
			size: {
				default: "h-8 text-sm",
				sm: "h-7 text-xs",
				lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

const SidebarMenuButton = ({
	asChild = false,
	isActive = false,
	variant = "default",
	size = "default",
	className,
	...props
}: React.ComponentProps<"button"> & {
	asChild?: boolean;
	isActive?: boolean;
} & VariantProps<typeof sidebarMenuButtonVariants>) => {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-size={size}
			data-active={isActive}
			className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
			disabled={props.disabled}
			{...props}
		/>
	);
};

const SidebarSecondaryMenuButton = ({
	asChild = false,
	isActive = false,
	variant = "default",
	size = "default",
	className,
	...props
}: React.ComponentProps<"button"> & {
	asChild?: boolean;
	isActive?: boolean;
} & VariantProps<typeof sidebarMenuButtonVariants>) => {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-size={size}
			data-active={isActive}
			className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
			{...props}
		/>
	);
};

const SidebarMenuSkeleton = ({
	className,
	...props
}: ComponentProps<"div">) => {
	return (
		<div
			data-slot="sidebar-menu-skeleton"
			data-sidebar="menu-skeleton"
			className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
			{...props}
		/>
	);
};

export {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarSecondaryMenuButton,
	SidebarMenuSkeleton,
};
