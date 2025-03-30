import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  username: null,
  email: null,
  image: null,
  error: null,
  loading: false, // Add loading state
};

// Async thunk for fetching user
export const fetchUser = createAsyncThunk("user/fetchUser", async (payload, thunkAPI) => {
  try {
    const res = await axios.post("http://localhost:5000/get-user", payload);
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch user");
  }
});

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when making a new request
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.image = action.payload.image;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Correctly assign error message
      });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
