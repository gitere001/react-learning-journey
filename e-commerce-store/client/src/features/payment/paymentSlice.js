import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {

	paymentStatus: 'idle', // 'idle', 'processing', 'request-sent', 'checking-payment' 'payment-success', 'payment-error'
	error: null,
	showPaymentModal: false,
	checkoutRequestID: null
}

export const stkPush = createAsyncThunk('payment/stkPush', async (payload, thunkApi) => {
	try {
		const response = await axios.post('https://2133-102-219-210-14.ngrok-free.app/stk', payload)
		return response.data

	} catch (error) {
		return thunkApi.rejectWithValue(error.response ? error.response.data : error.message)

	}
})
export const stkQuery = createAsyncThunk('payment/stkQuery', async (payload, thunkApi) => {
	try {
		const response = await axios.post('https://2133-102-219-210-14.ngrok-free.app/stkquery', payload)
		return response.data

	} catch (error) {
		return thunkApi.rejectWithValue(error.response ? error.response.data : error.message)

	}

})

const paymentSlice = createSlice({
	name: "payment",
	initialState,
	reducers: {
		openPaymentModal: (state) => { state.showPaymentModal = true },
		closePaymentModal: state => { state.showPaymentModal = false },
		resetPaymentStatus: (state) => {
			state.paymentStatus = 'idle'
			state.error = null
			state.checkoutRequestID = null
		}
	},
	extraReducers: builder => {
		builder.addCase(stkPush.pending, (state) => {
			state.paymentStatus = 'processing'
		})
		builder.addCase(stkPush.fulfilled, (state, action) => {
			state.paymentStatus = 'request-sent'
			if (action.payload.data) {
				state.checkoutRequestID = action.payload.data.CheckoutRequestID;
			}
		})
		builder.addCase(stkPush.rejected, (state, action) => {
			state.error = action.payload
			state.paymentStatus = 'payment-error'
		})
		builder.addCase(stkQuery.pending, (state) => {
			state.paymentStatus='checking-payment'
		})
		builder.addCase(stkQuery.fulfilled, (state, action) => {
			const resultCode = action.payload.data?.ResultCode;
			const resultDesc = action.payload.data?.ResultDesc || "Unknown error";

			if (resultCode === "0") {
				state.paymentStatus = "payment-success";
			} else {
				state.paymentStatus = "payment-failed";
				state.error = resultDesc; // Store the error message
			}
		});
		builder.addCase(stkQuery.rejected, (state, action) => {
			state.paymentStatus = "payment-error"
			state.error=action.payload
		})

	}
})
const paymentReducer = paymentSlice.reducer
export default paymentReducer
export const {openPaymentModal, closePaymentModal, resetPaymentStatus} = paymentSlice.actions