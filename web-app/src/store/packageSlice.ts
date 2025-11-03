import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPackages,
  getPackageById,
  createPackage,
  stepPackageStatus,
  getPackageByDeviceId,
  getAllPackageTracking,
  createPackageTracking,
  getPackageTrackingByDeviceId,
  getLogs,
  clearLogs,
} from "../api/api.ts";
import type { Package, PackageTracking } from "../types/types.ts";

type PackagesState = {
  data: Package[];
  current: Package | null;
  loading: boolean;
  error: string | null;
  logs: string;
  tracking: Record<string, PackageTracking[]>;
};

const initialState: PackagesState = {
  data: [],
  loading: false,
  current: null,
  error: null,
  logs: "",
  tracking: {},
};

// Fetch packages with params
export const fetchPackages = createAsyncThunk(
  "packages/fetchPackages",
  async (params: {
    senderId: number;
    receiverId: number;
    currentCarrierId?: number;
    status?: string;
    senderAddress?: string;
    receiverAddress?: string;
    limit?: number;
    readingsLimit?: number;
  }) => {
    return await getPackages(params);
  }
);

// Fetch package by ID
export const fetchPackageById = createAsyncThunk(
  "packages/fetchPackageById",
  async ({
    id,
    readingsLimit,
  }: {
    id: number | string;
    readingsLimit?: number;
  }) => {
    return await getPackageById(id, readingsLimit);
  }
);

export const fetchPackagesForUser = createAsyncThunk(
  "packages/fetchPackagesForUser",
  async (params: {
    userId: number;
    role: "sender" | "receiver" | "carrier" | "admin";
  }) => {
    const { userId, role } = params;

    // Map role to the API query parameter
    const query: Record<string, number> = {};
    if (role === "sender") query.senderId = userId;
    if (role === "carrier") query.currentCarrierId = userId;
    if (role === "receiver") query.receiverId = userId;

    return await getPackages(query); // getPackages returns an array of packages
  }
);

// Create a new package
export const createNewPackage = createAsyncThunk(
  "packages/createNewPackage",
  async (payload: {
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
    return await createPackage(payload);
  }
);

// Step package status
export const stepStatus = createAsyncThunk(
  "packages/stepStatus",
  async (id: number | string) => {
    return await stepPackageStatus(id);
  }
);

// Fetch package by deviceId
export const fetchPackageByDeviceId = createAsyncThunk(
  "packages/fetchPackageByDeviceId",
  async ({
    deviceId,
    readingsLimit,
  }: {
    deviceId: string;
    readingsLimit?: number;
  }) => {
    return await getPackageByDeviceId(deviceId, readingsLimit);
  }
);

// Fetch all package tracking
export const fetchAllPackageTracking = createAsyncThunk(
  "packages/fetchAllPackageTracking",
  async () => {
    return await getAllPackageTracking();
  }
);

// Create package tracking
export const createNewPackageTracking = createAsyncThunk(
  "packages/createNewPackageTracking",
  async (payload: PackageTracking) => {
    return await createPackageTracking(payload);
  }
);

// Fetch tracking by deviceId
export const fetchPackageTrackingByDeviceId = createAsyncThunk(
  "packages/fetchPackageTrackingByDeviceId",
  async ({ deviceId, latest }: { deviceId: string; latest?: boolean }) => {
    return await getPackageTrackingByDeviceId(deviceId, latest);
  }
);

// Fetch logs
export const fetchLogs = createAsyncThunk("packages/fetchLogs", async () => {
  return await getLogs();
});

// Clear logs
export const clearLogsThunk = createAsyncThunk(
  "packages/clearLogs",
  async () => {
    return await clearLogs();
  }
);

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch packages.";
      })
      .addCase(fetchPackagesForUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackagesForUser.fulfilled, (state, action) => {
        state.loading = false;
        const incomingPackages: Package[] = action.payload;

        incomingPackages.forEach((pkg) => {
          const index = state.data.findIndex((p) => p.id === pkg.id);
          if (index >= 0) {
            state.data[index] = pkg; // update existing
          } else {
            state.data.push(pkg); // add new
          }
        });
      })
      .addCase(fetchPackagesForUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch packages for user.";
      })
      .addCase(fetchPackageById.fulfilled, (state, action) => {
        const payload = action.payload as Package | undefined;
        if (!payload) return;

        const idx = state.data.findIndex(p => p.id === payload.id);
        if (idx >= 0) {
          // replace and move to end so it’s treated as “latest”
          state.data.splice(idx, 1);
        }
        state.data.push(payload);

        // track last searched explicitly
        state.current = payload;
      })

      .addCase(createNewPackage.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      .addCase(stepStatus.fulfilled, (state, action) => {
        const packageIndex = state.data.findIndex(
          (pkg) => pkg.id === action.payload.id
        );
        if (packageIndex >= 0) {
          state.data[packageIndex] = action.payload;
        }
      })

      .addCase(fetchPackageByDeviceId.fulfilled, (state, action) => {
        const packageIndex = state.data.findIndex(
          (pkg) => pkg.id === action.payload.id
        );
        if (packageIndex >= 0) {
          state.data[packageIndex] = action.payload;
        } else {
          state.data.push(action.payload);
        }
      })

      .addCase(fetchAllPackageTracking.fulfilled, (state, action) => {
        state.tracking = action.payload;
      })

      .addCase(createNewPackageTracking.fulfilled, (state, action) => {
        const tracking = action.payload;
        if (tracking.deviceId) {
          if (!state.tracking[tracking.deviceId]) {
            state.tracking[tracking.deviceId] = [];
          }
          state.tracking[tracking.deviceId].push(tracking);
        }
      })

      .addCase(fetchPackageTrackingByDeviceId.fulfilled, (state, action) => {
        if (action.meta.arg.deviceId) {
          state.tracking[action.meta.arg.deviceId] = action.payload;
        }
      })

      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.logs = action.payload;
      })

      .addCase(clearLogsThunk.fulfilled, (state) => {
        state.logs = "";
      });
  },
});

export default packagesSlice.reducer;
