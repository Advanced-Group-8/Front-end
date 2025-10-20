// api/user.ts
import api from "./axios";

export const getProfileDetails = async () => {
  try {
    const response = await api.get("/auth/me");
    console.log("get profile details:", response.data)
    return response.data;
  } catch (error) {
    console.error("Unable to get profile information", error);
    throw error;
  }
};
