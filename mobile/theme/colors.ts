export interface ThemeColors {
  primary: string;
  secondary: string;

  accentGreen: string;
  accentOrange: string;
  accentRed: string;
  accentMutedGreen: string;

  backgroundPrimary: string;
  backgroundSecondary: string;
  surface: string;
  border: string;

  textPrimary: string;
  textSecondary: string;
  textAccentPrimary: string;
  textAccentSecondary: string;
  iconAccent: string;

  headerBackground: string;
  tabBar: string;
  tabBarIcon: string;
  tabBarIconActive: string;
  themeButton: string;
  modalBackground: string;

  notification: string;
  shadow: string;

  dotPrimary?: string;
  dotSecondary?: string;
  circleBackground?: string;
  textBox?: string;
  infoIcon?: string;
}

export const lightTheme: ThemeColors = {
  // Primary colors
  primary: "#26408B",   // blå
  secondary: "#507255", // grön

  // Accent colors
  accentGreen: "#ABDBB5",
  accentOrange: "#FFA630",
  accentRed: "#D32F2F",
  accentMutedGreen: "#507255",

  // Neutrals
  backgroundPrimary: "#EDF4F4",  // ljus bakgrund
  backgroundSecondary: "#FFFFFF",
  surface: "#F5F5F5",
  border: "#1C1C1C",

  // Text & icons
  textPrimary: "#000000",
  textSecondary: "#333333",
  textAccentPrimary: "#26408B",
  textAccentSecondary: "#507255",
  iconAccent: "#000000",

  // Components
  headerBackground: "#EDF4ED",
  tabBar: "#FFFFFF",
  tabBarIcon: "#26408B",
  tabBarIconActive: "#FFA630",
  themeButton: "#507255",
  modalBackground: "#FFFFFF",

  // Feedback
  notification: "#D32F2F",
  shadow: "#00000029",
};

export const darkTheme: ThemeColors = {
  // Primary colors
  primary: "#26408B",   // blå
  secondary: "#507255", // grön

  // Accent colors
  accentGreen: "#ABDBB5",
  accentOrange: "#FFA630",
  accentRed: "#D32F2F",
  accentMutedGreen: "#507255",

  // Neutrals
  backgroundPrimary: "#1C1C1C",   // mörk bakgrund
  backgroundSecondary: "#000000",
  surface: "#121212",
  border: "#333333",

  // Text & icons
  textPrimary: "#EDF4ED",
  textSecondary: "#9E9E9E",
  textAccentPrimary: "#ABDBB5",
  textAccentSecondary: "#FFA630",
  iconAccent: "#FFFFFF",

  // Components
  headerBackground: "#000000",
  tabBar: "#1C1C1C",
  tabBarIcon: "#ABDBB5",
  tabBarIconActive: "#FFA630",
  themeButton: "#507255",
  modalBackground: "#1C1C1C",

  // Feedback
  notification: "#D32F2F",
  shadow: "#00000099",
};
