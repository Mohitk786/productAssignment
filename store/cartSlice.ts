import { Product } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Cart state interface
interface CartState {
  items: Product[];
}

// Initial state with cart items loaded from localStorage (client-side only)
const initialState: CartState = {
  items: typeof window !== "undefined" && localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") as string)
    : [], // Load from localStorage if available, otherwise default to empty array
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      // Check if the product already exists in the cart
      const productExists = state.items.some(item => item.id === action.payload.id);
      
      if (productExists) {
        toast.error("Item already exists in the cart");
        return;
      }

      // Add the product to the cart
      state.items.push(action.payload);

      // Update localStorage after adding the item
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      // Remove the product from the cart based on its id
      state.items = state.items.filter(item => item.id !== action.payload);
      
      // Update localStorage after removing the item
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;




/*

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Product interface
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

// Cart state interface
interface CartState {
  items: Product[];
}

// Helper function to get the cart from localStorage
const getCartFromLocalStorage = (): Product[] => {
  const cart = localStorage.getItem("cartItems");
  return cart ? JSON.parse(cart) : [];
};

// Initial state using localStorage data
const initialState: CartState = {
  items: getCartFromLocalStorage(),
};

// Slice for cart actions
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      // Check if the product already exists in the cart
      const productExists = state.items.some(item => item.id === action.payload.id);

      if (productExists) {
        toast.error("Item already exists in the cart");
        return;
      }

      // Add product to the cart
      state.items.push(action.payload);
      toast.success("Item added to cart");
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      // Remove product from the cart
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    // Action to sync the cart with localStorage
    syncCartWithLocalStorage: (state) => {
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

// Thunk for saving cart to localStorage after any change
export const saveCartToLocalStorage = () => (dispatch: any, getState: any) => {
  const { cart } = getState();
  localStorage.setItem("cartItems", JSON.stringify(cart.items));
};

export const { addToCart, removeFromCart, syncCartWithLocalStorage } = cartSlice.actions;
export default cartSlice.reducer;
*/