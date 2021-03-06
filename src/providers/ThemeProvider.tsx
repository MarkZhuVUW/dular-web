import { FC, useState, ComponentType } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Theme, ThemeContext } from "../contexts/ThemeContext";
import { useLocalStorage } from "../contexts/LocalStorageContext";
import LocalStorageKeys from "../constants/LocalStorageKeys";

import muiThemeDark from "../themes/Dark";
import muiThemeLight from "../themes/Light";

export const ThemeProvider: FC = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const { getItemOrDefault, setItem } = useLocalStorage();

  const [theme, setThemeState] = useState(
    getItemOrDefault(
      LocalStorageKeys.THEME,
      prefersDarkMode ? Theme.Dark : Theme.Light
    )
  );

  const setTheme = (theme: Theme) => {
    setItem(LocalStorageKeys.THEME, theme);
    setThemeState(theme);
  };

  const muiTheme = theme === Theme.Dark ? muiThemeDark : muiThemeLight;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <CssBaseline />
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export const withTheme = <PropsType extends object>(
  Component: ComponentType<PropsType>
): FC<PropsType> => (props: PropsType) => (
  <ThemeProvider>
    <Component {...props} />
  </ThemeProvider>
);
