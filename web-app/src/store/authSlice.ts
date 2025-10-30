import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "./store";
import type { Profile } from "../types/types.ts";

const API_BASE_URL =
  window.env?.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL;

// Type for the login request body
export type LoginRequest = {
  email: string;
  name: string;
  password: string;
};

// Slice state type
export type AuthState = {
  profile: Profile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  profile: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for logging in
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/sign-in`,
        credentials
      );
      const { token } = response.data;
      if (!token) throw new Error("No token returned from login");

      localStorage.setItem("token", token);

      // Get profile with token
      const profileResp = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        token,
        profile: profileResp.data.data,
      };
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: unknown }).response === "object" &&
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message
      ) {
        return rejectWithValue(
          (error as { response: { data: { message: string } } }).response.data
            .message
        );
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token");
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data as Profile;
    } catch {
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.profile = action.payload;
    },
    logout(state) {
      state.profile = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.profile = action.payload.profile;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
