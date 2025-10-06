import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeContext"; 

const Header = ({ title = "Orders", showBack = false }) => {
  const { theme } = useTheme(); 
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const handleBack = () => {
    if (route.name === "Tracking") {
      navigation.navigate("Timeline");
    } else if (route.name === "Timeline") {
      navigation.navigate("Orders");
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.innerContent}>
          {showBack ? (
            <TouchableOpacity onPress={handleBack}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color={theme.iconAccent}
              />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 28 }} />
          )}

          <Text style={styles.title}>{title}</Text>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="account"
              size={28}
              color={theme.iconAccent}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme, insets) =>
  StyleSheet.create({
    container: {
      paddingTop: insets.top,
      backgroundColor: "transparent",
    },
    inner: {
      height: 56,
      width: "100%",
      backgroundColor: theme.headerBackground,
      elevation: 4,
      justifyContent: "center",
    },
    innerContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.textPrimary,
    },
  });

export default Header; 