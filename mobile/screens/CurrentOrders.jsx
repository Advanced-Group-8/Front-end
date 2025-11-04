import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";
import { useNavigation } from "@react-navigation/native"; // ✅ navigation-hook

const API =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://t8-server-d2fee2awcybjcqch.swedencentral-01.azurewebsites.net";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5IiwiZW1haWwiOiJyZWJlY2NhQHRlc3QuYWIiLCJuYW1lIjoiQmV4Iiwicm9sZSI6InNlbmRlciIsImNvbXBhbnlOYW1lIjoiVGVzdCBBQiIsImNyZWF0ZWRBdCI6IjIwMjUtMTEtMDJUMTg6Mjc6MjMuNzkzWiIsInVwZGF0ZWRBdCI6IjIwMjUtMTEtMDJUMTg6Mjc6MjMuNzkzWiIsImlhdCI6MTc2MjEwODA1MiwiZXhwIjoxNzYyNzEyODUyfQ.DwQT_U-bZezbZrtcD9I1Zn4WbTac0KOQjK7xlkMjZ2Q";

const CurrentOrders = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation(); 

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API}/package?senderId=19`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      if (json?.data) setOrders(json.data);
    } catch (err) {
      console.log("❌ Fetch error:", err);
    }
  };

  const filtered = orders.filter((o) =>
    o.id.toString().includes(search)
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="bell-outline"
            size={28}
            color={theme.textAccentSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <MaterialCommunityIcons name="magnify" size={22} color={theme.textSecondary} />
        <TextInput
          placeholder="Search package ID"
          placeholderTextColor={theme.textSecondary}
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* ORDERS LIST */}
      <ScrollView>
        {filtered.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.orderCard}
            onPress={() =>
              navigation.navigate("Tracking", {
                packageId: order.deviceId,
                token: TOKEN,
              })
            }
          >
            <View style={styles.orderLeft}>
              <Image
                source={require("../assets/favicon.png")}
                style={styles.boxIcon}
              />
              <View>
                <Text style={styles.orderId}>ID: {order.id}</Text>
                <Text style={styles.orderDate}>
                  From: {order?.sender?.city || "—"} → To: {order?.receiver?.city || "—"}
                </Text>
              </View>
            </View>

            {/* STATUS TAG */}
            <View
              style={[
                styles.statusTag,
                order.status === "delivered" && { backgroundColor: theme.accentGreen },
                order.status === "in_transit" && { backgroundColor: theme.accentOrange },
                order.status === "pending" && { backgroundColor: theme.accentRed },
              ]}
            >
              <Text style={styles.statusText}>
                {order.status === "delivered"
                  ? "Completed"
                  : order.status === "in_transit"
                  ? "In Transit"
                  : "Pending"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    headerTitle: {
      color: theme.textAccentPrimary,
      fontSize: 22,
      fontWeight: "700",
    },
    searchBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.surface,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom: 18,
    },
    searchInput: {
      marginLeft: 8,
      color: theme.textPrimary,
      flex: 1,
    },
    orderCard: {
      backgroundColor: theme.surface,
      padding: 14,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
      shadowColor: theme.shadow,
      shadowOpacity: 0.15,
      elevation: 2,
    },
    orderLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    boxIcon: {
      width: 40,
      height: 40,
      marginRight: 12,
    },
    orderId: {
      color: theme.textPrimary,
      fontWeight: "600",
      fontSize: 15,
    },
    orderDate: {
      color: theme.textSecondary,
      fontSize: 12,
    },
    statusTag: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 8,
    },
    statusText: {
      color: "#000",
      fontWeight: "700",
      fontSize: 12,
    },
  });

export default CurrentOrders;
