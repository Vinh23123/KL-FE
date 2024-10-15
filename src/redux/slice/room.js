import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllPosts as getAllRooms } from "../../services/roomApi";

// FAKE for testing: 'https://jsonplaceholder.typicode.com/todos'
// When having api, replace testing api
export const fetchAllRooms = createAsyncThunk("fetchAllRooms", async () => {
  const res = await getAllRooms();
  return res;
});

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllRooms.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllRooms.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAllRooms.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default roomSlice.reducer;
