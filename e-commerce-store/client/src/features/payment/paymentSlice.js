import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getErrorMessage } from "../../utils/paymentErrors";
import axios from "axios"
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL="http://178.128.43.230/mpesa"
const initialState = {

	paymentStatus: 'idle', // 'idle', 'processing', 'request-sent', 'checking-payment' 'payment-success', 'payment-error'
	error: null,
	showPaymentModal: false,
	checkoutRequestID: null,
	stkQueryResultCode: null
}

export const stkPush = createAsyncThunk('payment/stkPush', async (payload, thunkApi) => {
	console.log(payload);
	try {
		const response = await axios.post("/stk", payload)
		return response.data

	} catch (error) {
		return thunkApi.rejectWithValue(error.response ? error.response.data : error.message)

	}
})
export const stkQuery = createAsyncThunk('payment/stkQuery', async (payload, thunkApi) => {
	try {
		const response = await axios.post("/stkquery", payload)
		console.log("payload: ", payload);
		const data = response.data
		console.log(data.data);
		return response.data.data

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
			state.stkQueryResultCode = null
		},

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
			state.paymentStatus = 'checking-payment'
		})
		builder.addCase(stkQuery.fulfilled, (state, action) => {

			const resultCode = action.payload?.ResultCode;

			state.stkQueryResultCode = resultCode;

			if (resultCode === "0") {
				state.paymentStatus = "payment-success";



			} else {
				state.paymentStatus = "payment-failed";
				state.error = getErrorMessage(resultCode); // Store the error message
			}
		});
		// builder.addCase(stkQuery.rejected, (state, action) => {
		// 	state.paymentStatus = "payment-error"
		// 	state.error=action.payload
		// })

	}
})
const paymentReducer = paymentSlice.reducer
export default paymentReducer
export const { openPaymentModal, closePaymentModal, resetPaymentStatus } = paymentSlice.actions