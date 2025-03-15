import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
	loading: false,
	products: [],
	error: ""
}


const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	const response = await axios.get('https://fakestoreapi.com/products/')
	return response.data
})

const productsSlice = createSlice({
	name: 'products',
	initialState,
	extraReducers: builds => {
		builds.addCase(fetchProducts.pending, (state) => {
			state.loading = true
		})
		builds.addCase(fetchProducts.fulfilled, (state, action) => {
			state.loading = false
			state.products = action.payload
		})
		builds.addCase(fetchProducts.rejected, (state, action) => {
			state.loading = false
			state.error = action.error.message
		})
	}
})
const productsReducer = productsSlice.reducer
export { productsReducer, fetchProducts }