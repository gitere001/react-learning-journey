import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	openMobileMenu: false
}

const mobileSlice = createSlice({
	name: "mobile",
	initialState,
	reducers: {
		showMobileMenu: (state) => { state.openMobileMenu = true },
		hideMobileMenu: state => { state.openMobileMenu = false }
	}
})
export const { showMobileMenu, hideMobileMenu } = mobileSlice.actions
const mobileReducer = mobileSlice.reducer
export default mobileReducer