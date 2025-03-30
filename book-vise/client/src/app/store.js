import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import mobileReducer from "../features/mobile-menu/mobileSlice";


const store = configureStore({
	reducer: {
		userAuth: authReducer,
		userDetails: userReducer,
		mobile: mobileReducer


	}
})
export default store