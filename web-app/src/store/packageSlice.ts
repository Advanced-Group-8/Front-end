import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from "../api/api.ts";
import type { Package } from "../types/types.ts";

type PackagesState = {
  data: Package[];
  loading: boolean;
  error: string | null;
};

const initialState: PackagesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPackages = createAsyncThunk(
  "packages/fetchPackages",
  async (params?: { senderId?: number; receiverId?: number }) => {
    return await getPackages(params?.senderId, params?.receiverId);
  }
);

export const fetchPackageById = createAsyncThunk(
  "packages/fetchPackageById",
  async (id: string) => {
    const response = await getPackageById(id);
    return response as Package;
  }
);

export const updatePackageById = createAsyncThunk(
  "packages/updatePackageById",
  async ({
    id,
    updatedData,
  }: {
    id: string;
    updatedData: Partial<Package>;
  }) => {
    const response = await updatePackage(id, updatedData);
    return response as Package;
  }
);

export const deletePackageById = createAsyncThunk(
  "packages/deletePackageById",
  async (id: string) => {
    await deletePackage(id);
    return Number(id);
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

      .addCase(fetchPackageById.fulfilled, (state, action) => {
        const packageIndex = state.data.findIndex(
          (pkg) => pkg.id === action.payload.id
        );
        if (packageIndex >= 0) {
          state.data[packageIndex] = action.payload;
        } else {
          state.data.push(action.payload);
        }
      })

      .addCase(updatePackageById.fulfilled, (state, action) => {
        const packageIndex = state.data.findIndex(
          (pkg) => pkg.id === action.payload.id
        );
        if (packageIndex >= 0) {
          state.data[packageIndex] = action.payload;
        }
      })

      .addCase(deletePackageById.fulfilled, (state, action) => {
        state.data = state.data.filter((pkg) => pkg.id !== action.payload);
      });
  },
});

export default packagesSlice.reducer;
