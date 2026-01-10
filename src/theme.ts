import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
	createTheme({
		palette: {
			mode,
			primary: {
				main: "#232f55",
			},
			secondary: {
				main: "#4fc3f7",
			},
			background: {
				default: mode === "dark" ? "#121212" : "#f5f7fa",
				paper: mode === "dark" ? "#000c64" : "#ffffff",
			},
		},
		typography: {
			fontFamily: "Inter, Roboto, Arial, sans-serif",
		},
	});
