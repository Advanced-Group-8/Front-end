import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "./store";
import type { Role } from "../types/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Type for the login request body
export type LoginRequest = {
  email: string;
  name: string;
  password: string;
};

// Type for the user/profile returned by the API
export type UserProfile = {
  id: number;
  email: string;
  name: string;
  role: Role;
  companyName: string;
  createdAt: string;
  updatedAt: string;
};

// Slice state type
export type AuthState = {
  profile: UserProfile | null;
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
        profile: profileResp.data,
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
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
