import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveLoggedIn = async (loggedIn: boolean) => {
  await AsyncStorage.setItem("loggedIn", JSON.stringify(loggedIn));
};
