import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getUser from "../utils/fetch/getUser";

const HomeScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5IiwiZW1haWwiOiJyZWJlY2NhQHRlc3QuYWIiLCJuYW1lIjoiQmV4Iiwicm9sZSI6InNlbmRlciIsImNvbXBhbnlOYW1lIjoiVGVzdCBBQiIsImNyZWF0ZWRBdCI6IjIwMjUtMTEtMDJUMTg6Mjc6MjMuNzkzWiIsInVwZGF0ZWRBdCI6IjIwMjUtMTEtMDJUMTg6Mjc6MjMuNzkzWiIsImlhdCI6MTc2MjEwODA1MiwiZXhwIjoxNzYyNzEyODUyfQ.DwQT_U-bZezbZrtcD9I1Zn4WbTac0KOQjK7xlkMjZ2Q";

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCargo, setSelectedCargo] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser(TOKEN);

        if (response && response.data) {
          setUser(response.data);
        } else {
          setError("No user data received");
        }
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setError("Failed to fetch user");
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {/* === HEADER === */}
      <View style={styles.header}>
        <Image source={require("../assets/favicon.png")} style={styles.profileImage} />
        <Text style={styles.headerTitle}>HOME</Text>
        <TouchableOpacity onPress={() => alert("Notifications clicked!")}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={28}
            color={theme.textAccentSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* === PROFILE SECTION === */}
      <View style={styles.card}>
        <Text style={styles.signedIn}>Signed in as</Text>
        <View style={styles.cardHeader}>
          <Image source={require("../assets/favicon.png")} style={styles.profileImage} />
          
          <View style={{ flex: 1 }}>
            <Text style={styles.driverName}>
              {user ? user.name : "Loading..."}
            </Text>
            <Text style={styles.driverSub}>
              {user ? user.role : ""}
            </Text>
          </View>

          <View style={styles.cardDetailsRight}>
            <Text style={styles.detail}>Company: {user?.companyName}</Text>
            <Text style={styles.detail}>Email: {user?.email}</Text>
            <Text style={styles.detail}>ID: {user?.id}</Text>
            <Text style={styles.detail}>
              Created: {user?.createdAt?.slice(0, 10)}
            </Text>
          </View>
        </View>
      </View>

      {/* === STATUS SECTION === */}
      <View style={styles.statusContainer}>
        {[
          { icon: "check-decagram", count: 12, label: "Deliveries" },
          { icon: "cube-outline", count: 5, label: "Pending" },
          { icon: "truck-outline", count: 3, label: "In Transit" },
          { icon: "alert-outline", count: 1, label: "Delays" },
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
        
        {[
          { name: "Volvo FH", price: "₹6000", weight: "10 Ton" },
          { name: "Scania R520", price: "₹5500", weight: "8 Ton" },
          { name: "MAN TGX", price: "₹7000", weight: "12 Ton" },
        ].map((truck, index) => {
          const isActive = selectedCargo === index;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCargo(isActive ? null : index)} 
              style={[
                styles.cargoBox,
                isActive && {
                  backgroundColor: theme.accentGreen + "22", 
                  borderColor: theme.accentGreen,
                  borderWidth: 1,
                },
                index !== 0 && { marginTop: 12 } 
              ]}
            >
              <View style={styles.cargoTextContainer}>
                <Text style={styles.cargoName}>Truck: {truck.name}</Text>
                <Text style={styles.cargoPrice}>Per day: {truck.price}</Text>
                <Text style={styles.cargoWeight}>Weight: {truck.weight}</Text>
                {isActive && <Text style={{ color: theme.textAccentSecondary }}>Active</Text>}
              </View>
              <Image
                source={require("../assets/favicon.png")}
                style={styles.truckIcon}
              />
            </TouchableOpacity>
          );
        })}
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
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
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
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 12,
      backgroundColor: theme.accentMutedGreen,
    },
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
      justifyContent: "space-between",
      marginBottom: 10,
    },
    cardDetailsRight: {
      alignItems: "flex-start",
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
      marginBottom: 0,
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
