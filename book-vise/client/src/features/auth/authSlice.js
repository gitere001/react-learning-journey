import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = "https://bookwise-server-omega.vercel.app";


const initialState = {
	isLoggedIn: false,
	loading: false,
	error: null,
	success: null,
	showAuthModal: false,
};
console.log("apiUrl", apiUrl);

export const loginUser = createAsyncThunk("auth/loginUser", async (payload, thunkAPI) => {
	try {
		const res = await axios.post(`${apiUrl}/login-user`, payload);
		return res.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
	}
});

export const registerUser = createAsyncThunk("auth/registerUser", async (payload, thunkAPI) => {
	try {
		const res = await axios.post(`${apiUrl}/register-user`, payload);
		return res.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
	}
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetAuth: (state) => {
			state.error = null;
			state.isLoggedIn = false;
			state.loading = false;
		},
		resetFeedback: (state) => {
			state.error = null;
			state.success = null;
		},
		showAuthPage: (state) => {
			state.showAuthModal = true;
		},
		hideAuthPage: (state) => {
			state.showAuthModal = false;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state) => {
				state.loading = false;
				state.isLoggedIn = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Login failed";
			})
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Registration failed";
			});
	},
});

export default authSlice.reducer;
export const { resetAuth, resetFeedback, showAuthPage, hideAuthPage } = authSlice.actions;