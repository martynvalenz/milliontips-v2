import { useParams } from "@tanstack/react-router";

export const useWorkspaceId = () => {
	const params = useParams({ strict: false });
	const workspaceId = params.workspaceId;
	return workspaceId;
};
