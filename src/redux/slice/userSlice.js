import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../../services/userApi";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "users/login",
  async (data, thunkAPI) => {
    try {
      const res = await login(data);
      console.log(res);
      toast.success("Login successfully");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userLogout = createAsyncThunk("users/logout", async (thunkAPI) => {
  try {
    const res = await logout();
    console.log(res);
    toast.warn("Logout successfully");
    // Redirect the user to the login page
    // persistor.purge();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  isLoading: false,
  isError: false,
  isAuthenticated: false,
  errorMSG: null,
  data: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.errorMSG = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.data = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isError = true;
      state.errorMSG = action.payload;
    });
    builder.addCase(userLogout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.data = null;
      state.isError = false;
      state.errorMSG = null;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isError = true;
      state.errorMSG = action.payload;
    });
  },
});

export default userSlice.reducer;
