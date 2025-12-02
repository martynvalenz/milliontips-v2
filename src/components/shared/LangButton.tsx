// 1. Import Router Hooks
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { flags } from "@/i18n/flags";
import { config, type Locale } from "@/i18n/i18n";
import { cn } from "@/lib/utils";
import { useLocale } from "@/modules/core/hooks/useLocale";
import { useIsMobile } from "@/modules/core/hooks/useViewports";
import useOverlay from "@/modules/core/store/overlay.store";

const LangButton = () => {
	const lang = useLocale();
	const [isPending, startTransition] = useTransition();
	const isMobile = useIsMobile();
	const { setOverlayOpen: setOpenLangLoader, setMessage } = useOverlay();

	// Initialize Router Hooks
	const navigate = useNavigate();
	// strict: false allows us to access params even if this component isn't a direct route child
	const params = useParams({ strict: false });
	// Get current search params to preserve them
	const search = useSearch({ strict: false });

	const onLangChange = (value: Locale) => {
		// Prevent navigating if clicking the same language
		if (value === lang) return;

		setOpenLangLoader(true);
		setMessage(value === "es" ? "Cambiando idioma..." : "Changing language...");

		startTransition(() => {
			setTimeout(async () => {
				// 3. Determine new locale param
				// If switching to default (en), remove param (undefined). Else use value (es).
				const nextLocale = value === config.defaultLocale ? undefined : value;

				await navigate({
					to: ".", // Stay on the current route node
					params: {
						...params,
						locale: nextLocale,
					},
					search: search, // Preserve query params (e.g. ?page=2)
					replace: true, // Replace history entry so "Back" doesn't just toggle language
				});

				setOpenLangLoader(false);
			}, 1200); // Your artificial delay
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant={isMobile ? "outline" : "ghost"}
					size={isMobile ? "icon" : "default"}
					className="flex items-center gap-2"
				>
					<Languages className="size-4" />
					<span className="hidden md:block">
						{lang === "es" ? "Español" : "English"}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<DropdownMenuItem
					onClick={() => onLangChange("en")}
					className={cn("cursor-pointer", lang === "en" && "bg-primary/10")}
					disabled={isPending}
				>
					<span>English</span>
					<DropdownMenuShortcut>
						<span className="text-lg">{flags.en}</span>
					</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => onLangChange("es")}
					className={cn("cursor-pointer", lang === "es" && "bg-primary/10")}
					disabled={isPending}
				>
					<span>Español</span>
					<DropdownMenuShortcut>
						<span className="text-lg">{flags.es}</span>
					</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LangButton;
