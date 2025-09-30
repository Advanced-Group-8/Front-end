import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import Header from "../components/Header";

const CurrentOrders = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Header title="Current Orders" />
      <Text style={styles.text}>Här visas dina nuvarande ordrar.</Text>
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

export default CurrentOrders;