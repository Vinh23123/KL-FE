import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCurrentHotel,
  fetchCurrentHotel,
  updateCurrentHotel,
} from "../../services/hotelApi";

// FAKE for testing: 'https://jsonplaceholder.typicode.com/todos'
// When having api, replace testing api
export const fetchHotel = createAsyncThunk(
  "hotels/fetchHotel",
  async (_, thunkAPI) => {
    try {
      const res = await fetchCurrentHotel();
      console.log(res);

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateHotel = createAsyncThunk(
  "hotels/updateHotels",
  async (data, thunkAPI) => {
    console.log("here");
    try {
      const res = await updateCurrentHotel(data);

      return res.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createHotel = createAsyncThunk(
  "hotels/createHotel",
  async (data, thunkAPI) => {
    try {
      console.log("here");
      const res = await createCurrentHotel(data);

      return res.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoading: false,
  isError: false,
  errorMSG: null,
  data: null,
  hasHotel: false,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    resetHotelState: () => initialState, // Action to reset state
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHotel.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHotel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.hasHotel = true;
    });
    builder.addCase(fetchHotel.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
      state.hasHotel = false;
    });
    builder.addCase(updateHotel.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(updateHotel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(updateHotel.rejected, (state, action) => {
      console.log("Error1", action.payload);
      state.isError = true;
      state.errorMSG = action.payload.status;
    });
    builder.addCase(createHotel.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(createHotel.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.data = action.payload;
      state.hasHotel = true;
    });
    builder.addCase(createHotel.rejected, (state, action) => {
      console.log("Error1", action.payload);
      state.isError = true;
      state.errorMSG = action.payload.status;
    });
  },
});

export const { resetHotelState } = hotelSlice.actions;
export default hotelSlice.reducer;
