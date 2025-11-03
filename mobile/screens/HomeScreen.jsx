import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import get from "../utils/fetch/get";
import { getProfUrl } from "../utils/base-url";

const HomeScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkiLCJlbWFpbCI6InJlYmVjY2FAdGVzdC5jb20iLCJuYW1lIjoiUmViZWNjYSIsInJvbGUiOiJzZW5kZXIiLCJjb21wYW55TmFtZSI6IlRlc3RhcmUgQUIiLCJjcmVhdGVkQXQiOiIyMDI1LTEwLTIxVDExOjQ1OjIxLjIwOVoiLCJ1cGRhdGVkQXQiOiIyMDI1LTEwLTIxVDExOjQ1OjIxLjIwOVoiLCJpYXQiOjE3NjEwNTI4OTcsImV4cCI6MTc2MTY1NzY5N30.jpEVRcozifN9RABMqDGTEnrXGoFWjJRnoo9Z0mlG88U";
  const user = get(getProfUrl, TOKEN, "user");
  console.log(user);
  const driver = {
    name: "Erik Torres Puente",
    experience: "+7 Years",
    truckModel: "Volvo FH",
    plateNo: "MH06 HV 2514",
    rating: "⭐ 4.5",
  };

  return (
    <View style={styles.container}>
      {/* === HEADER === */}
      <View style={styles.header}>
        <Image
          source={require("../assets/favicon.png")}
          style={styles.profileImage}
        />
        <Text style={styles.headerTitle}>HOME</Text>
        <TouchableOpacity onPress={() => alert("Notifications clicked!")}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={28}
            color={theme.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* === PROFILE SECTION === */}
      <View style={styles.card}>
        <Text style={styles.signedIn}>Signed in as</Text>
        <View style={styles.cardHeader}>
          <Image
            source={require("../assets/favicon.png")}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.driverName}>{driver.name}</Text>
            <Text style={styles.driverSub}>{driver.experience}</Text>
          </View>
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.detail}>Truck Model: {driver.truckModel}</Text>
          <Text style={styles.detail}>Plate No: {driver.plateNo}</Text>
          <Text style={styles.detail}>Rating: {driver.rating}</Text>
        </View>
      </View>

      {/* === STATUS SECTION === */}
      <View style={styles.statusContainer}>
        {[
          { icon: "timer-sand", count: 86, label: "Active" },
          { icon: "cube-outline", count: 35, label: "Pending" },
          { icon: "truck-outline", count: 23, label: "In Transit" },
          { icon: "alert-outline", count: 43, label: "Delays" },
        ].map((item, index) => (
          <View key={index} style={styles.statusBox}>
            <MaterialCommunityIcons
              name={item.icon}
              size={28}
              color={theme.textAccentSecondary}
            />
            <Text style={styles.statusCount}>{item.count}</Text>
            <Text style={styles.statusLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* === AVAILABLE CARGOS === */}
      <View style={styles.cargoCard}>
        <Text style={styles.cargoTitle}>Available Cargos</Text>

        <View style={styles.cargoBox}>
          <View style={styles.cargoTextContainer}>
            <Text style={styles.cargoName}>New Truck: {driver.truckModel}</Text>
            <Text style={styles.cargoPrice}>Per day: ₹6000</Text>
            <Text style={styles.cargoWeight}>Weight: 10 Ton</Text>
          </View>

          <Image
            source={require("../assets/favicon.png")}
            style={styles.truckIcon}
          />
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingTop: 50,
      paddingHorizontal: 16,
    },

    // === HEADER ===
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },

    logo: {
      width: 32,
      height: 32,
      resizeMode: "contain",
    },

    headerTitle: {
      position: "absolute",
      left: 0,
      right: 0,
      textAlign: "center",
      color: theme.textAccentPrimary,
      fontSize: 20,
      fontWeight: "700",
    },

    // === PROFILE CARD ===
    card: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      shadowColor: theme.shadow,
      shadowOpacity: 0.3,
      elevation: 3,
    },
    signedIn: {
      color: theme.textAccentPrimary,
      fontSize: 14,
      marginBottom: 8,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 12,
      backgroundColor: theme.accentMutedGreen,
    },
    driverName: {
      color: theme.textPrimary,
      fontSize: 18,
      fontWeight: "600",
    },
    driverSub: {
      color: theme.textSecondary,
    },
    cardDetails: {
      marginTop: 5,
    },
    detail: {
      color: theme.textSecondary,
      marginBottom: 4,
    },

    // === STATUS SECTION ===
    statusContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    statusBox: {
      alignItems: "center",
      flex: 1,
    },
    statusCount: {
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: "700",
      marginTop: 4,
    },
    statusLabel: {
      color: theme.textSecondary,
      fontSize: 12,
    },

    // === AVAILABLE CARGO ===
    cargoCard: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 16,
      shadowColor: theme.shadow,
      shadowOpacity: 0.2,
      elevation: 4,
    },
    cargoTitle: {
      color: theme.textAccentPrimary,
      fontSize: 16,
      fontWeight: "700",
      marginBottom: 8,
    },
    cargoBox: {
      backgroundColor: theme.backgroundSecondary,
      borderRadius: 8,
      padding: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cargoTextContainer: {
      flex: 1,
      marginRight: 10,
    },
    cargoName: {
      color: theme.textPrimary,
      fontWeight: "600",
    },
    cargoPrice: {
      color: theme.accentOrange,
      marginTop: 4,
    },
    cargoWeight: {
      color: theme.textSecondary,
      marginTop: 2,
    },
    truckIcon: {
      width: 45,
      height: 45,
      resizeMode: "contain",
    },
  });

export default HomeScreen;
