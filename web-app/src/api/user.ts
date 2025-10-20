import axios from "axios";
import type { Profile } from "../types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getProfileDetails = async () => {
  try {

    let token;
    
    // First hand, check if Authorization header exists
    const defaultAuthHeader = axios.defaults.headers.common["Authorization"] as string;

     if (defaultAuthHeader && defaultAuthHeader.startsWith("Bearer ")) {
      token = defaultAuthHeader.split(" ")[1];
    } else {

      // Fallback
      token = localStorage.getItem("token");
    }

    if (!token) {
      throw new Error("No auth token found");
    }

    //Request
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Return the user data 
    return response.data.data as Profile; // {userId} 

  } catch (error) {
    console.error("Unable to get profile information", error);
    throw error;
  }
};