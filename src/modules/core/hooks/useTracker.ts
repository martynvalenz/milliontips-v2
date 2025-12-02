import { eventTracker } from "../actions/eventTracker";

interface UseTrackingData {
	event: string;
	lang: string;
	domain: string;
	pathname: string;
	params?: Map<string, string> | undefined;
	timeZone: string;
	platform: string;
	userAgent: string;
	city: string;
	country: string;
	workspaceId?: string;
}

export const useTracker = () => {
	const sendTrackEvent = ({
		event,
		domain,
		pathname,
		params = undefined,
		timeZone,
		platform,
		userAgent,
		city,
		country,
		lang,
		workspaceId,
	}: UseTrackingData) => {
		eventTracker({
			data: {
				event,
				domain,
				pathname,
				params,
				timeZone,
				platform,
				userAgent,
				city,
				country,
				lang,
				workspaceId,
			},
		});
	};

	return {
		sendTrackEvent,
	};
};
