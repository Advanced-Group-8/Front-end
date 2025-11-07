import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "../theme/ThemeContext";
import AppHeader from "../components/AppHeader";

// API + TOKEN stay exactly as they are ✅
const API =
  process.env.EXPO_PUBLIC_API_URL ||
  "https://t8-server-d2fee2awcybjcqch.swedencentral-01.azurewebsites.net";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE5IiwiZW1haWwiOiJyZWJlY2NhQHRlc3QuYWIiLCJuYW1lIjoiQmV4Iiwicm9sZSI6InNlbmRlciIsImNvbXBhbnlOYW1lIjoiVGVzdCBBQiIsImNyZWF0ZWRBdCI6IjIwMjUtMTEtMDJUMTg6Mjc6MjMuNzkzWiIsInVwZGF0ZWRBdCI6IjIwMjUtMTEtMDJUMTg6Mjc6MjMuNzkzWiIsImlhdCI6MTc2MjEwODA1MiwiZXhwIjoxNzYyNzEyODUyfQ.DwQT_U-bZezbZrtcD9I1Zn4WbTac0KOQjK7xlkMjZ2Q";

interface OrderItem {
  id: number;
  receiver?: {
    name?: string;
    city?: string;
  };
  temperature?: number;
  humidity?: number;
}

const QRScannerScreen: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [permission, requestPermission] = useCameraPermissions();
  const [scannerActive, setScannerActive] = useState<boolean>(false);
  const [lastScanned, setLastScanned] = useState<number>(0);

  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [showQRSelector, setShowQRSelector] = useState<boolean>(false);
  const [currentQR, setCurrentQR] = useState<OrderItem | null>(null);

  const [infoPopup, setInfoPopup] = useState<OrderItem | null>(null);

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

  const handleScan = ({ data }: BarcodeScanningResult) => {
  const now = Date.now();
  if (now - lastScanned < 1200) return; 
  setLastScanned(now);

  const match = orders.find((o) => o.id.toString() === data.toString());
  if (match) {
    setScannerActive(false);
    setInfoPopup(match);
  }
  };

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.centerScreen}>
        <Text style={styles.requestText}>Camera permission needed</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* UNIVERSAL HEADER (log - title - notification) */}
      <AppHeader title="QR Scanner" onBellPress={() => alert("Notifications clicked!")} />

      {/* ===== BUTTONS BEFORE SCANNING ===== */}
      {!scannerActive && (
        <View style={styles.centerWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setScannerActive(true)}
          >
            <Text style={styles.buttonText}>Open Scanner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.accentGreen }]}
            onPress={() => setShowQRSelector(true)}
          >
            <Text style={styles.buttonText}>Generate Fake QR</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ===== CAMERA SCANNER ===== */}
      {scannerActive && (
        <View style={{ flex: 1 }}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={scannerActive ? handleScan : undefined}
          />

          {/* Scanner focus frame */}
          <View style={styles.overlayContainer}>
            <View style={styles.focusBox} />
          </View>

          {/* Buttons under camera */}
          <View style={styles.bottomCenter}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.accentGreen }]}
              onPress={() => setShowQRSelector(true)}
            >
              <Text style={styles.buttonText}>Generate Fake QR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.accentRed }]}
              onPress={() => setScannerActive(false)}
            >
              <Text style={styles.buttonText}>Close Scanner</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ===== PICK ORDER FOR FAKE QR ===== */}
      <Modal visible={showQRSelector} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select order to create QR</Text>

            <FlatList
              data={orders}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.orderItem}
                  onPress={() => {
                    setCurrentQR(item);
                    setShowQRSelector(false);

                    setTimeout(() => {
                      setCurrentQR(null);
                      setInfoPopup(item);
                    }, 2000);
                  }}
                >
                  <Text style={styles.orderText}>Order #{item.id}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* ===== QR DISPLAY ===== */}
      <Modal visible={!!currentQR} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBoxCenter}>
            <Text style={styles.modalTitle}>Scan this QR</Text>
            <View style={styles.qrBox}>
              <QRCode value={currentQR?.id?.toString() || ""} size={200} />
            </View>
            <Text style={styles.orderText}>Order ID: {currentQR?.id}</Text>
          </View>
        </View>
      </Modal>

      {/* ===== POPUP ORDER INFO ===== */}
      <Modal visible={!!infoPopup} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.infoBox}>
            <Text style={styles.modalTitle}>Order Information</Text>

            <Text style={styles.infoText}>Order ID: {infoPopup?.id}</Text>
            <Text style={styles.infoText}>
              Receiver: {infoPopup?.receiver?.name || "None"}
            </Text>
            <Text style={styles.infoText}>
              City: {infoPopup?.receiver?.city || "None"}
            </Text>
            <Text style={styles.infoText}>
              Temperature: {infoPopup?.temperature || "—"}°
            </Text>
            <Text style={styles.infoText}>
              Humidity: {infoPopup?.humidity || "—"}%
            </Text>

            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={() => setInfoPopup(null)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      paddingTop: 55,
      paddingHorizontal: 16,
    },
    camera: { flex: 1 },
    overlayContainer: {
      position: "absolute",
      top: 150,
      left: 0,
      right: 0,
      alignItems: "center",
    },
    focusBox: {
      width: 250,
      height: 250,
      borderColor: theme.accentGreen,
      borderWidth: 3,
      borderRadius: 18,
    },
    centerWrapper: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      backgroundColor: theme.primary,
      paddingVertical: 12,
      paddingHorizontal: 18,
      borderRadius: 10,
      marginBottom: 15,
      width: 220,
    },
    buttonText: {
      color: theme.surface,
      textAlign: "center",
      fontWeight: "700",
      fontSize: 15,
    },
    modalBg: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.8)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalBox: {
      backgroundColor: theme.surface,
      width: "82%",
      borderRadius: 12,
      padding: 22,
      maxHeight: "75%",
    },
    modalBoxCenter: {
      backgroundColor: theme.surface,
      padding: 20,
      borderRadius: 12,
      width: "80%",
      alignItems: "center",
    },
    modalTitle: {
      color: theme.textAccentPrimary,
      fontSize: 20,
      fontWeight: "700",
      textAlign: "center",
      marginBottom: 14,
    },
    orderItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    orderText: {
      color: theme.textPrimary,
      fontSize: 16,
      fontWeight: "600",
    },
    qrBox: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      alignSelf: "center",
      marginBottom: 10,
    },
    centerScreen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    requestText: {
      color: theme.textPrimary,
      fontSize: 16,
      marginBottom: 12,
      textAlign: "center",
    },
    infoBox: {
      backgroundColor: theme.surface,
      width: "82%",
      borderRadius: 12,
      padding: 22,
      alignItems: "center",
    },
    infoText: {
      color: theme.textPrimary,
      fontSize: 16,
      marginVertical: 3,
    },
    bottomCenter: {
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
      alignItems: "center",
    },
  });

export default QRScannerScreen;
