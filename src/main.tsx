import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
	ThemeProvider,
	CssBaseline,
	useMediaQuery,
} from "@mui/material";
import { getTheme } from "./theme";
import { ThemeContext, type ThemeMode } from "./context/ThemeContext.tsx";

function Root() {
	const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
	const [mode, setMode] = React.useState<ThemeMode>(() => {
		return (localStorage.getItem("theme") as ThemeMode) ??
			(prefersDark ? "dark" : "light");
	});

	const toggleMode = () => {
		setMode((prev) => {
			const next = prev === "dark" ? "light" : "dark";
			localStorage.setItem("theme", next);
			return next;
		});
	};

	const theme = React.useMemo(() => getTheme(mode), [mode]);

	return (
		<ThemeContext.Provider value={{ mode, toggleMode }}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</ThemeContext.Provider>
	);
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
