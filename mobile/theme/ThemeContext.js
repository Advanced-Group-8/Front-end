import React, { createContext, useContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "./colors";
import { buildCustomTheme } from "./customTheme";
import { StatusBar, Platform } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const theme = isDark ? darkTheme : lightTheme;
  const customTheme = buildCustomTheme(theme, isDark);
  const toggleTheme = () => setIsDark((prev) => !prev);

useEffect(() => {
  StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");

  if (Platform.OS === "android") {
    StatusBar.setBackgroundColor(
      isDark ? darkTheme.headerBackground : lightTheme.headerBackground
    );
  }
}, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, theme, customTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
