import axios from "axios";

import type { Package } from "../types/types.ts";

const API_BASE_URL = import.meta.env.API_BASE_URL;

export const getPackages = async (senderId?: number, receiverId?: number) => {
  try {
    const params: Record<string, number> = {};
    if (senderId !== undefined) params.senderId = senderId;
    if (receiverId !== undefined) params.receiverId = receiverId;

    const response = await axios.get(`${API_BASE_URL}/package`, {
      params,
    });
    console.log("API response:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

export const getPackageById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/package/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching package with ID ${id}:`, error);
    throw error;
  }
};

export const updatePackage = async (
  id: string,
  updatedData: Partial<Package>
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/package/${id}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating package with ID ${id}:`, error);
    throw error;
  }
};

export const deletePackage = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/package/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting package with ID ${id}:`, error);
    throw error;
  }
};
