import { configureStore } from "@reduxjs/toolkit";
import packagesReducer from "./packageSlice.ts";

const store = configureStore({
  reducer: {
    packages: packagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
