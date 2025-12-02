import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

const ThemeContext = createContext<{
	theme: Theme;
	setTheme: (t: Theme) => void;
}>({
	theme: "light",
	setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(() => {
		// Read theme BEFORE hydration if possible
		if (typeof window !== "undefined") {
			return (localStorage.getItem("theme") as Theme) || "system";
		}
		return "system";
	});

	const setTheme = (t: Theme) => {
		setThemeState(t);
		if (typeof window !== "undefined") {
			localStorage.setItem("theme", t);
		}
	};

	// Apply theme to <html> on mount + on change
	useEffect(() => {
		const root = document.documentElement;
		root.classList.remove("light", "dark");
		if (theme === "system") {
			root.classList.add(
				window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light",
			);
		} else {
			root.classList.add(theme);
		}
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
