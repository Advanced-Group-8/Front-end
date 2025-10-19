import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import Header from "../components/Header";

const OrderTimeline = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Header title="Order Timeline" showBack={true} />
      <Text style={styles.text}>Här kan du se orderns tidslinje.</Text>
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

export default OrderTimeline;