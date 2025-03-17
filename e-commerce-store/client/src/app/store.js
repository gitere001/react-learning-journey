import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import paymentReducer from "../features/payment/paymentSlice";

const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
		payment: paymentReducer
	}
})
export default store