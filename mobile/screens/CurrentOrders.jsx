/*import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { EXPO_PUBLIC_API_URL } from "@env";
import { useTheme } from "../theme/ThemeContext"; 

export default function CurrentOrders() {
  const { theme } = useTheme(); 

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkiLCJlbWFpbCI6InJlYmVjY2FAdGVzdC5jb20iLCJuYW1lIjoiUmViZWNjYSIsInJvbGUiOiJzZW5kZXIiLCJjb21wYW55TmFtZSI6IlRlc3RhcmUgQUIiLCJjcmVhdGVkQXQiOiIyMDI1LTEwLTIxVDExOjQ1OjIxLjIwOVoiLCJ1cGRhdGVkQXQiOiIyMDI1LTEwLTIxVDExOjQ1OjIxLjIwOVoiLCJpYXQiOjE3NjEwNTI4OTcsImV4cCI6MTc2MTY1NzY5N30.jpEVRcozifN9RABMqDGTEnrXGoFWjJRnoo9Z0mlG88U";
      
      const senderId = 9;
      const receiverId = 2; // Test receiverid until further notice

  const response = await fetch(
    `${EXPO_PUBLIC_API_URL}/package?senderId=${senderId}&receiverId=${receiverId}`,
    {
      method: "GET",
      headers: {
       "Authorization": `Bearer ${token}`,
       "Content-Type": "application/json",
     },
    }
  );


  const data = await response.json();
  console.log("API-svar:", data);

  setOrders(data.data || []); 

    } catch (error) {
      console.error("Fel vid hämtning av ordrar:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={styles.loadingText}>Fetch orders...</Text>
      </View>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noOrdersText}>No orders found</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>Order #{item.id}</Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Status:</Text> {item.status}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Sender:</Text> {item.sender?.name}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Receiver:</Text> {item.receiver?.name}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Destination:</Text> {item.destination}
      </Text>
      <Text style={styles.text}>
        <Text style={styles.label}>Weight:</Text> {item.weight} kg
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      padding: 15,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundPrimary,
    },
    loadingText: {
      marginTop: 10,
      color: theme.textPrimary,
    },
    noOrdersText: {
      color: theme.textPrimary,
    },
    card: {
      backgroundColor: theme.backgroundSecondary,
      padding: 15,
      marginBottom: 12,
      borderRadius: 12,
      shadowColor: theme.shadow,
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 6,
      color: theme.primary,
    },
    text: {
      color: theme.textPrimary,
    },
    label: {
      fontWeight: "bold",
      color: theme.textSecondary,
    },
  }); 

  */

  import { StyleSheet, Text, View } from 'react-native'
  import React from 'react'
  
  const CurrentOrders = () => {
    return (
      <View>
        <Text>CurrentOrders</Text>
      </View>
    )
  }
  
  export default CurrentOrders
  
  const styles = StyleSheet.create({})