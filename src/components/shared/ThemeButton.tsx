"use client";

import { MonitorSmartphone, Moon, MoonStar, Sun, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLocale } from "@/modules/core/hooks/useLocale";
import { useTheme } from "@/providers/theme-provider";

// import { useLocale } from 'next-intl';
// import { useTheme } from 'next-themes';

const ThemeButton = () => {
	const { theme, setTheme } = useTheme();
	const lang = useLocale();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<SunIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">
						{lang === "es" ? "Cambiar tema" : "Toggle theme"}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => setTheme("light")}
					className={cn(theme === "light" && "bg-primary/10")}
				>
					{lang === "es" ? "Claro" : "Light"}
					<DropdownMenuShortcut>
						<Sun className="size-5" />
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("dark")}
					className={cn(theme === "dark" && "bg-primary/10")}
				>
					{lang === "es" ? "Oscuro" : "Dark"}
					<DropdownMenuShortcut>
						<MoonStar className="size-5" />
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("system")}
					className={cn(theme === "system" && "bg-primary/10")}
				>
					{lang === "es" ? "Sistema" : "System"}
					<DropdownMenuShortcut>
						<MonitorSmartphone className="size-5" />
					</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ThemeButton;
