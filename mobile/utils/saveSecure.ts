import * as SecureStore from "expo-secure-store";

export const saveUser = async (userInfo: object) => {
  await SecureStore.setItemAsync("user", JSON.stringify(userInfo));
};

export const saveToken = async (token: string) => {
  await SecureStore.setItemAsync("token", token);
};
