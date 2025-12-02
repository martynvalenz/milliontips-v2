import { createContext, type ReactNode, useContext, useState } from "react";

type WorkspaceContextType = {
	selectedWorkspaceId: string | null;
	setSelectedWorkspaceId: (id: string | null) => void;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
	undefined,
);

export function WorkspaceProvider({
	initialWorkspaceId,
	children,
}: {
	initialWorkspaceId: string | null;
	children: ReactNode;
}) {
	const [selectedWorkspaceId, setSelectedWorkspaceId] =
		useState(initialWorkspaceId);

	return (
		<WorkspaceContext.Provider
			value={{
				selectedWorkspaceId,
				setSelectedWorkspaceId,
			}}
		>
			{children}
		</WorkspaceContext.Provider>
	);
}

export function useSelectedWorkspace() {
	const context = useContext(WorkspaceContext);
	if (!context)
		throw new Error(
			"useSelectedWorkspace must be used within a WorkspaceProvider",
		);
	return context;
}
