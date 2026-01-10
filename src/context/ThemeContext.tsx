import React from "react";

export type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  mode: "light",
  toggleMode: () => {},
});
