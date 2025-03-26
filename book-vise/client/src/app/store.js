import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";


const store = configureStore({
	reducer: {
		userAuth: authReducer

	}
})
export default store