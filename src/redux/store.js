import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../redux/slice/hotelSlice"; // Adjust the import according to your file structure

export const store = configureStore({
  reducer: { hotel: hotelReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables serializable value checks
    }),
});
