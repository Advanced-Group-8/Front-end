import axios from "axios";

export const API_BASE_URL = "http://localhost:3000";

export const getPackages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};
