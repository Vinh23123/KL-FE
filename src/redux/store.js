import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "../redux/slice/room";

export const store = configureStore({
  reducer: { room: roomSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // detects non-serializable values
      // doc: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
      serializableCheck: false,
    }),
});
