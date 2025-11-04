import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

const AppHeader = ({ title, onBellPress }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
     <View style={styles.header}>
        {/* Left logo */}
        <Image 
          source={require("../assets/favicon.png")} 
          style={styles.logo}
        />

        {/* Centered Title */}
        <Text style={styles.headerTitle}>{title}</Text>

        {/* Right Bell Icon */}
        <TouchableOpacity onPress={onBellPress}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={28}
            color={theme.textAccentSecondary}
          />
        </TouchableOpacity>
     </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
      width: "100%",
      position: "relative",
    },
    headerTitle: {
      position: "absolute",
      left: 0,
      right: 0,
      textAlign: "center",
      color: theme.textAccentPrimary,
      fontSize: 22,
      fontWeight: "700",
    },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.accentMutedGreen,
    },
  });

export default AppHeader;
