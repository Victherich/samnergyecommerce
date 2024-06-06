import { createSlice } from "@reduxjs/toolkit";

const MySlice = createSlice({
  name: "user",
  initialState: {
    cart: [],
    wishlist: []
  },
  reducers: {
    addToCart: (state, { payload }) => {
        const itemIndex = state.cart.findIndex(item => item.id === payload.id);
        if (itemIndex !== -1) {
          state.cart[itemIndex].qty += 1;
        } else {
          state.cart = [...state.cart, { ...payload, qty: 1 }];
        }
      },
      
    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((e) => e.id !== payload);
    },
    updateQuantity: (state, { payload }) => {
      const item = state.cart.find((e) => e.id === payload.id);
      if (item) {
        item.qty = Math.max(1, item.qty + payload.delta);
      }
    },
    
    addToWishlist: (state, { payload }) => {
        const itemIndex = state.wishlist.findIndex(item => item.id === payload.id);
        if (itemIndex !== -1) {
        //   state.wishlist[itemIndex].qty += 1;
        // state.wishlist = state.wishlist.filter((e) => e.id !== payload);
        } else {
          state.wishlist = [...state.wishlist, { ...payload}];
        }
      },
      
    removeFromWishlist: (state, { payload }) => {
      state.wishlist = state.wishlist.filter((e) => e.id !== payload);
    },
  }
});

export const { addToCart, removeFromCart, updateQuantity,addToWishlist,removeFromWishlist } = MySlice.actions;
export default MySlice.reducer;
