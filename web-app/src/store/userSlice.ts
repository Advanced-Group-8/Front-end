import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getProfileDetails } from "../api/user"; // adjust import to match your folder
import type { Profile } from "../types/types";


export const fetchUserProfile = createAsyncThunk<Profile>(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProfileDetails();
      return data;
    } catch (error: any) {
      console.error("Failed to fetch profile:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);

interface UserState {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.profile = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch profile";
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
