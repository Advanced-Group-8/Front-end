import axios from "axios";

import type { Package } from "../types/types.ts";

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

export const getPackageById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/packages/${id}`);
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
      `${API_BASE_URL}/packages/${id}`,
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
    const response = await axios.delete(`${API_BASE_URL}/packages/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting package with ID ${id}:`, error);
    throw error;
  }
};
