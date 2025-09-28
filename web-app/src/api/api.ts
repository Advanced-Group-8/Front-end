import axios from "axios";

import type { PackageTracking } from "../types/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// -------- PACKAGE ENDPOINTS --------

// GET /package (med alla query-parametrar)
export const getPackages = async (params: {
  senderId: number;
  receiverId: number;
  currentCarrierId?: number;
  status?: string;
  senderAddress?: string;
  receiverAddress?: string;
  limit?: number;
  readingsLimit?: number;
}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/package`, { params });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

// POST /package
export const createPackage = async (payload: {
  senderId: number;
  receiverId: number;
  currentCarrierId: number;
  deviceId: string;
  senderAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  receiverAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/package`, payload);
    return response.data.data;
  } catch (error) {
    console.error("Error creating package:", error);
    throw error;
  }
};

// GET /package/{id}
export const getPackageById = async (
  id: number | string,
  readingsLimit?: number
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/package/${id}`, {
      params: readingsLimit ? { readingsLimit } : undefined,
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching package with ID ${id}:`, error);
    throw error;
  }
};

// PATCH /package/{id} (step status)
export const stepPackageStatus = async (id: number | string) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/package/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error stepping status for package with ID ${id}:`, error);
    throw error;
  }
};

// GET /package/device/{deviceId}
export const getPackageByDeviceId = async (
  deviceId: string,
  readingsLimit?: number
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/package/device/${deviceId}`,
      {
        params: readingsLimit ? { readingsLimit } : undefined,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching package with deviceId ${deviceId}:`, error);
    throw error;
  }
};

// -------- PACKAGE TRACKING ENDPOINTS --------

// GET /package-tracking (alla tracking records grupperade per device)
export const getAllPackageTracking = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/package-tracking`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching all package tracking:", error);
    throw error;
  }
};

// POST /package-tracking (skapa tracking record)
export const createPackageTracking = async (payload: PackageTracking) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/package-tracking`,
      payload
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating package tracking:", error);
    throw error;
  }
};

// GET /package-tracking/{deviceId}
export const getPackageTrackingByDeviceId = async (
  deviceId: string,
  latest?: boolean
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/package-tracking/${deviceId}`,
      {
        params: latest !== undefined ? { latest } : undefined,
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching tracking for deviceId ${deviceId}:`, error);
    throw error;
  }
};

// -------- LOGGNING ENDPOINTS --------

// GET /logs (hämta loggfil som text)
export const getLogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/logs`, {
      responseType: "text",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};

// DELETE /logs (rensa loggfil)
export const clearLogs = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/logs`);
    return response.data;
  } catch (error) {
    console.error("Error clearing logs:", error);
    throw error;
  }
};
