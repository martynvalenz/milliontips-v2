// src/modules/workspace/context/workspace.context.tsx

import { createContext, type ReactNode, useContext, useMemo } from "react";
import type { WorkspaceUserRole } from "@/generated/prisma/enums";

// 1. Define the shape of your Workspace object (or import it from your DB types)
type Workspace = {
	workspaceId: string;
	name: string;
	role: WorkspaceUserRole;
};

interface WorkspaceContextType {
	workspace: Workspace | null;
	isLoading: boolean;
}

// 2. Create the Context
const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
	undefined,
);

// 3. Create the Provider
// We accept 'initialWorkspace' which comes from the Route Loader/Context
export function WorkspaceProvider({
	children,
	initialWorkspace,
}: {
	children: ReactNode;
	initialWorkspace: Workspace | null;
}) {
	// In a URL-driven app, we usually don't need 'useState' here.
	// We trust the Router to pass us the correct data via props.
	// When the URL changes -> Loader runs -> Prop updates -> Context updates.

	const value = useMemo(
		() => ({
			workspace: initialWorkspace,
			isLoading: false, // You could hook this up to router.state.isLoading if desired
		}),
		[initialWorkspace],
	);

	return (
		<WorkspaceContext.Provider value={value}>
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
