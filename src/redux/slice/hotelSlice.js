import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentHotel, updateCurrentHotel } from "../../services/hotelApi";

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

const initialState = {
  isLoading: false,
  isError: false,
  errorMSG: null,
  data: [],
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHotel.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHotel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchHotel.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
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
  },
});

export default hotelSlice.reducer;
