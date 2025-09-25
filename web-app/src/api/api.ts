import axios from "axios";

import type { Package } from "../types/types.ts";

export const API_BASE_URL = "https://t8-server-d2fee2awcybjcqch.swedencentral-01.azurewebsites.net";


export const getPackages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/package-tracking`);
    return response.data;
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

// Nytt: Skapa nytt paket
export const createPackage = async (newPackage: Partial<Package>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/package`, newPackage);
    return response.data;
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
};

// Nytt: Hämta paket via deviceId
export const getPackageByDeviceId = async (deviceId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/package/device/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching package with deviceId ${deviceId}:`, error);
    throw error;
  }
};
