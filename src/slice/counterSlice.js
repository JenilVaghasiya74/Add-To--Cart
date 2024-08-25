import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  value: 0,
  cart: [],
  search: '',
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, action) => {
      const id = action.payload;
      const item = state.cart.find((i) => i.id === id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrement: (state, action) => {
      const id = action.payload;
      const item = state.cart.find((i) => i.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter(item => item.id != productId);
      toast.success(`Item Removed Successfully`, {
        position: "bottom-left",
        autoClose: 1000,
        pauseOnHover: true,
      });
    },
    searchtocart: (state, action) => {
      state.search = action.payload;
    },
    addtoCart: (state, action) => {
      const addcart = action.payload;
      let temp = state.cart.filter((item) => item.id === action.payload.id);
      if (temp.length === 0) {
        state.cart.push({ ...addcart, quantity: 1 });
        toast.success(`${addcart.title} Added Successfully`, {
          position: "bottom-left",
          autoClose: 1800,
          pauseOnHover: true,
        });
      } else {
        toast.error(`${addcart.title} Already in Cart`, {
          position: "bottom-left",
          autoClose: 1800,
          pauseOnHover: true,
        });
      }
    },
  },
})

export const { increment, decrement, addtoCart, removeFromCart, searchtocart } = counterSlice.actions

export default counterSlice.reducer
