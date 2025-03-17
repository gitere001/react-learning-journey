import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
	loading: false,
	products: [],
	error: null
}

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	const response = await axios('https://fakestoreapi.com/products')
	return response.data
})

const fetchProductsSlice = createSlice({
	name: 'products',
	initialState,
	extraReducers: builder => {
		builder.addCase(fetchProducts.pending, (state) => { state.loading = true })
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.loading = false
			state.products = action.payload
		})
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.error = action.error.message
			state.loading = false;
		})
	}
})
const productsReducer = fetchProductsSlice.reducer
export default productsReducer