import { configureStore } from "@reduxjs/toolkit";
import packagesReducer from "./packageSlice.ts";
import authReducer from "./authSlice.ts";

const store = configureStore({
  reducer: {
    packages: packagesReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
