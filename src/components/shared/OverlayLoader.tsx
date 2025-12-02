"use client";

import { Loader2 } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import useOverlay from "@/modules/core/store/overlay.store";

const OverlayLoader = () => {
	const { overlayOpen, message } = useOverlay();

	return (
		<Dialog open={overlayOpen}>
			<DialogContent showCloseButton={false} className="w-full mx-2 m`ax-w-xs">
				<DialogHeader className="sr-only">
					<DialogTitle>Loading...</DialogTitle>
				</DialogHeader>
				<div className="flex items-center gap-2 justify-center">
					<Loader2 className="size-6 animate-spin" />
					<div className="font-mono text-xl">{message}</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default OverlayLoader;
