import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "./store";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Type for the login request body
interface LoginRequest {
  email: string;
  name: string;
  password: string;
}

// Type for the user/profile returned by the API
export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
}

// Slice state type
interface AuthState {
  profile: UserProfile | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

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
        const response = await axios.post(`${API_BASE_URL}/auth/sign-in`, credentials);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = null;
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
            // After login succeeds
        localStorage.setItem("token", action.payload.token);
        state.token = action.payload.token;
        state.profile = action.payload.data; // assuming user info is in data
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
