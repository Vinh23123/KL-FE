import { combineReducers, configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../redux/slice/hotelSlice"; // Adjust the import if necessary
import userReducer from "../redux/slice/userSlice";
import storage from "redux-persist/lib/storage"; // Default storage for redux-persist
import { persistReducer, persistStore } from "redux-persist";

// Define persist configuration for the user slice
const userPersistConfig = {
  key: "user", // Persist only the user slice
  storage,
};

// Persist user reducer only
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// Combine reducers
const rootReducer = combineReducers({
  hotel: hotelReducer, // Non-persistent
  user: persistedUserReducer, // Persistent
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create and export the persistor
export const persistor = persistStore(store);
