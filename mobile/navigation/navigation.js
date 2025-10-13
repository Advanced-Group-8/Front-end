import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CurrentOrders from "../screens/CurrentOrders";
import OrderTimeline from "../screens/OrderTimeline";
import OrderTracking from "../screens/OrderTracking";
import { useTheme } from "../theme/ThemeContext";
import LoginForm from "../components/LoginForm";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  const { customTheme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: customTheme.colors.tabBar },
        tabBarActiveTintColor: customTheme.colors.tabBarIconActive,
        tabBarInactiveTintColor: customTheme.colors.tabBarIcon,
      }}
    >
      <Tab.Screen
        name="Orders"
        component={CurrentOrders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-list"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Timeline"
        component={OrderTimeline}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clock-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tracking"
        component={OrderTracking}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  const { customTheme } = useTheme();

  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Login" component={LoginForm} /> */}
        <Stack.Screen name="RootTabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
