import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import AppHeader from "./AppHeader";

const Layout = ({ title, children }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <AppHeader title={title} showBack={true} />
      {children}
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      padding: 16,
    },
    text: {
      color: theme.textPrimary,
      fontSize: 16,
    },
  });

export default Layout;
