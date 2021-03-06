import { createContext, useContext } from "react";

export enum Theme {
  Dark = "dark",
  Light = "light",
}

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Dark,
  setTheme: (theme) => {
    console.warn(`Failed to set theme = ${theme}, no theme provider`);
  },
});

export const useTheme = () => useContext(ThemeContext);
