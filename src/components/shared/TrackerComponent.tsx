"use client";

import { useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useLocale } from "@/modules/core/hooks/useLocale";
import { useTracker } from "@/modules/core/hooks/useTracker";
import { useDeviceStore } from "@/modules/core/store/device.store";
import { useWorkspaceId } from "@/modules/workspace/hooks/useWorkspaceId";

const TrackerComponent = ({
	event,
	params,
}: {
	event: string;
	params?: Record<string, string>;
}) => {
	const { sendTrackEvent } = useTracker();
	const lang = useLocale();
	const workspaceId = useWorkspaceId();

	const location = useLocation();
	const pathname = location.pathname;
	const { platform, userAgent, city, country } = useDeviceStore();

	useEffect(() => {
		const domain = window.location.href;
		sendTrackEvent({
			event,
			domain,
			pathname,
			params: params ? new Map(Object.entries(params)) : undefined,
			timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			platform,
			userAgent,
			city,
			country,
			lang,
			workspaceId,
		});
	}, [
		event,
		pathname,
		params,
		sendTrackEvent,
		platform,
		userAgent,
		city,
		country,
		lang,
		workspaceId,
	]);

	return null;
};

export default TrackerComponent;
