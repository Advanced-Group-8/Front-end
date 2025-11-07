import { ThemeColors } from "./colors";

export const buildCustomTheme = (baseTheme: ThemeColors, isDark: boolean) => ({
  dark: isDark,
  colors: {
    primary: baseTheme.primary,
    secondary: baseTheme.secondary,
    textAccentPrimary: baseTheme.textAccentPrimary,
    textAccentSecondary: baseTheme.textAccentSecondary,

    backgroundPrimary: baseTheme.backgroundPrimary,
    backgroundSecondary: baseTheme.backgroundSecondary,

    textPrimary: baseTheme.textPrimary,
    textSecondary: baseTheme.textSecondary,
    iconAccent: baseTheme.iconAccent,

    notification: baseTheme.notification,
    dotPrimary: baseTheme.dotPrimary as any,
    dotSecondary: baseTheme.dotSecondary as any,
    circleBackground: baseTheme.circleBackground as any,
    shadow: baseTheme.shadow,
    textBox: (baseTheme as any).textBox,

    tabBar: baseTheme.tabBar,
    tabBarIcon: baseTheme.tabBarIcon,
    infoIcon: (baseTheme as any).infoIcon,
    headerBackground: baseTheme.headerBackground,

    themeButton: baseTheme.themeButton,
  },
  fonts: {
    regular: {
      fontFamily: "System",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "System",
      fontWeight: "800",
    },
  },
});
