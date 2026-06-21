import { createSlice } from '@reduxjs/toolkit';

const getInitialCart = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : { id: null, items: [] };
};

const initialState = getInitialCart();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    createCart: (state, action) => {
      state.id = action.payload;
      // Don't clear items - they may have been added locally before cart was created on server
      localStorage.setItem('cart', JSON.stringify(state));
    },
    loadCart: (state, action) => {
      return action.payload;
    },
    addItem: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.product.id !== productId);
        } else {
          item.quantity = quantity;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.id = null;
      state.items = [];
      localStorage.removeItem('cart');
    },
    syncCart: (state, action) => {
      const { id, items } = action.payload;
      state.id = id;
      state.items = (items || []).map((item) => ({
        id: item.id, // Store the server cart item ID
        product: {
          id: item.product?.id,
          title: item.product?.title,
          unit_price: item.product?.unit_price,
        },
        quantity: item.quantity,
      }));
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const {
  createCart,
  loadCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  syncCart,
} = cartSlice.actions;

export default cartSlice.reducer;
