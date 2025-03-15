import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	balance: 0,
	activeModal: null,
};

const bankingSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {
		depositMoney: (state, action) => {
			state.balance += action.payload;
		},
		withdrawMoney: (state, action) => {
			state.balance -= action.payload;
		},
		showDepositModal: (state) => {
			state.activeModal = "deposit";
		},
		showWithdrawModal: (state) => {
			state.activeModal = "withdraw";
		},
		closeModal: (state) => {
			state.activeModal = null;
		}
	}
});

const bankingReducer = bankingSlice.reducer
export default bankingReducer
export const { depositMoney, withdrawMoney, showDepositModal, showWithdrawModal, closeModal } = bankingSlice.actions
