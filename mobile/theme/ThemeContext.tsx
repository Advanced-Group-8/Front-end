import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { lightTheme, darkTheme } from "./colors";
import { buildCustomTheme } from "./customTheme";
import { StatusBar, Platform } from "react-native";

// Typ för vad ThemeContext innehåller
interface ThemeContextType {
  isDark: boolean;
  theme: typeof lightTheme;
  customTheme: ReturnType<typeof buildCustomTheme>;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
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

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used inside a ThemeProvider");
  return context;
};
