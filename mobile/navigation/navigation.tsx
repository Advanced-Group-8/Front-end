import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

import HomeScreen from "../screens/HomeScreen";
import CurrentOrders from "../screens/CurrentOrders";
import OrderTracking from "../screens/OrderTracking";
import SettingsScreen from "../screens/SettingsScreen";
import QRScannerScreen from "../screens/QRScannerScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface CustomTabButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  theme: any;
}

function CustomTabBarButton({ children, onPress, theme }: CustomTabButtonProps) {
  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
        shadowColor: theme.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: theme.accentGreen,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}

function Tabs() {
  const { customTheme } = useTheme();
  const theme = customTheme.colors;
  const styles = createStyles(theme);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.tabBarIconActive,
        tabBarInactiveTintColor: theme.tabBarIcon,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Orders"
        component={CurrentOrders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      {/* Center QR Button */}
      <Tab.Screen
        name="Scan"
        component={QRScannerScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              color={focused ? theme.tabBarIconActive : theme.iconAccent}
              size={28}
            />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} theme={theme} />
          ),
        }}
      />

      <Tab.Screen
        name="Tracking"
        component={OrderTracking}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-cog-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RootTabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: theme.tabBar,
      height: 70,
      borderTopWidth: 0,
    },
  });

export default Navigation;
