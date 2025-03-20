import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cart: [],
  showCartModal: false,
  cartTotal: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.cart.push({ ...action.payload, count: 1 });
      }
    },

    incrementItemQuantity: (state, action) => {
      state.cart = state.cart.map(item =>
        item.id === action.payload ? { ...item, count: item.count + 1 } : item
      );
    },

    decrementItemQuantity: (state, action) => {
      state.cart = state.cart.map(item =>
        item.id === action.payload && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      );
    },

    removeItemFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },

    openCartModal: (state) => { state.showCartModal = true; },
    closeCartModal: (state) => { state.showCartModal = false; },
    checkingOut: (state, action) => {

      state.showCartModal = false
      state.cartTotal = action.payload
    },
    clearCart: (state) => { state.cart = []; state.cartTotal = 0 },
    buyNow: (state, action) => { state.cartTotal = action.payload }
  }
});

export const {
  addItemToCart,
  incrementItemQuantity,
  decrementItemQuantity,
  removeItemFromCart,
  openCartModal,
  closeCartModal,
  checkingOut,
  clearCart,
  buyNow
} = cartSlice.actions;
const cartReducer = cartSlice.reducer

export default cartReducer;
