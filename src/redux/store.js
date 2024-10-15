import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "../redux/slice/room";

export const store = configureStore({
  reducer: { room: roomSlice },
});
