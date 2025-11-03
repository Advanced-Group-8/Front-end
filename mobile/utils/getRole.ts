import * as SecureStore from "expo-secure-store";

export const getRole = async () => {
  const user = await JSON.parse(await SecureStore.getItemAsync("user"));
  return user.role;
};
