import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import AppHeader from "../components/AppHeader";
import { useTheme } from "../theme/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1F1F1F" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#000000" }] },
];

const OrderTracking = ({ route }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Safe fallback for missing packageId
  const packageId = route?.params?.packageId || "Unknown";

  // Fake route centered on Stockholm
  const fakeRoute = [
    { latitude: 59.3293, longitude: 18.0686 },
    { latitude: 59.3430, longitude: 18.0710 },
    { latitude: 59.3540, longitude: 18.0765 },
  ];

  const fakeInfo = {
    fromCity: "Stockholm Central",
    toCity: "Solna Station",
    customer: "Ryan Lubin",
    date: "Friday Jun 30, 2025",
    estimated: "Friday Jul 2, 2025",
    status: "In Transit",
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <AppHeader title="Tracking" />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* ===== MAP SECTION ===== */}
        <View style={styles.mapWrapper}>
          <MapView
            style={styles.map}
            customMapStyle={darkMapStyle}
            initialRegion={{
              latitude: 59.3293,
              longitude: 18.0686,
              latitudeDelta: 0.07,
              longitudeDelta: 0.07,
            }}
          >
            <Polyline
              coordinates={fakeRoute}
              strokeWidth={4}
              strokeColor={theme.accentGreen}
            />
            <Marker coordinate={fakeRoute[fakeRoute.length - 1]} />
          </MapView>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{fakeInfo.status}</Text>
          </View>
        </View>

        {/* ===== CONTACT CARD ===== */}
        <View style={styles.contactCard}>
          <Image source={require("../assets/User-icon.png")} style={styles.avatar} />
          <View>
            <Text style={styles.contactName}>Tiana Schleifer</Text>
            <Text style={styles.contactSub}>Customer</Text>
          </View>
          
          <View style={styles.callButton}>
            <Text style={styles.callIcon}>📞</Text>
          </View>
        </View>

        {/* ===== DETAILS SECTION ===== */}
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Tracking ID</Text>
            <Text style={styles.value}>{packageId}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Customer</Text>
            <Text style={styles.value}>{fakeInfo.customer}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>From</Text>
            <Text style={styles.value}>{fakeInfo.fromCity}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.value}>{fakeInfo.toCity}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{fakeInfo.date}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Estimated</Text>
            <Text style={styles.value}>{fakeInfo.estimated}</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingTop: -4,
      paddingHorizontal: 16,
    },

    mapWrapper: {
      height: 260,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: "#000",
      marginHorizontal: 16,
      marginTop: 10,
    },
    map: { flex: 1 },

    statusBadge: {
      position: "absolute",
      top: 12,
      right: 12,
      backgroundColor: theme.accentGreen,
      paddingHorizontal: 14,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      fontWeight: "700",
      color: "#000",
    },

    contactCard: {
      backgroundColor: theme.surface,
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      marginHorizontal: 16,
      marginTop: 15,
      borderRadius: 12,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 14,
    },
    contactName: {
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: "700",
    },
    contactSub: {
      color: theme.textSecondary,
      fontSize: 13,
    },
    callButton: {
      marginLeft: "auto",
      backgroundColor: theme.accentGreen,
      padding: 10,
      borderRadius: 25,
      opacity: 0.4, 
    },
    callIcon: { fontSize: 18 },

    detailsCard: {
      backgroundColor: theme.surface,
      marginHorizontal: 16,
      marginTop: 15,
      borderRadius: 12,
      padding: 16,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    label: {
      color: theme.textSecondary,
      fontSize: 14,
    },
    value: {
      color: theme.textPrimary,
      fontSize: 14,
      fontWeight: "600",
    },
  });

export default OrderTracking;
