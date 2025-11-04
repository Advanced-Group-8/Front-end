import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import { useTheme } from "../theme/ThemeContext";

const SettingsScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <AppHeader
        title="Settings"
        onBellPress={() => alert("Notifications clicked!")}
      />
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingTop: 55,
      paddingHorizontal: 16,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: theme.textPrimary,
      fontSize: 18,
      fontWeight: "600",
    },
  });

export default SettingsScreen;
