// src/modules/workspace/context/workspace.context.tsx

import { createContext, type ReactNode, useContext, useState } from "react";

// 1. Define the shape of your Workspace object (or import it from your DB types)
type Workspace = {
	selectedWorkspace: string | null;
	setSelectedWorkspace: (workspaceId: string | null) => void;
};

// 2. Create the Context
const WorkspaceContext = createContext<Workspace | undefined>(undefined);

// 3. Create the Provider
// We accept 'initialWorkspaceId' which comes from the Route Loader/Context
export function WorkspaceProvider({
	children,
	initialWorkspaceId,
}: {
	children: ReactNode;
	initialWorkspaceId: string | null;
}) {
	const [selectedWorkspaceId, setSelectedWorkspaceId] =
		useState(initialWorkspaceId);

	return (
		<WorkspaceContext.Provider
			value={{
				selectedWorkspace: selectedWorkspaceId,
				setSelectedWorkspace: setSelectedWorkspaceId,
			}}
		>
			{children}
		</WorkspaceContext.Provider>
	);
}

// 4. Create a custom Hook for easy consumption
export function useWorkspace() {
	const context = useContext(WorkspaceContext);
	if (context === undefined) {
		throw new Error("useWorkspace must be used within a WorkspaceProvider");
	}
	return context;
}
