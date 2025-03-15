import { configureStore } from "@reduxjs/toolkit";
import bankingReducer from "../features/Banking/transactionSlice.js";
import { productsReducer } from "../features/Products/productSlice.js";

const store = configureStore({
	reducer: {
		bank: bankingReducer,
		products: productsReducer
	}
})

export default store