import { create } from 'zustand';

const useStore = create((set) => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  return {
    productList: [],
    cartItems: storedCartItems,

    setProducts: newProducts => set(state => ({
      productList: newProducts
    })),

    addToCart: (product) =>
      set((state) => {
        const existingProductIndex = state.cartItems.findIndex(
          (item) => item.key === product.key
        );

        if (existingProductIndex !== -1) {
          const updatedCartItems = [...state.cartItems];
          updatedCartItems[existingProductIndex].quantity += product.quantity;
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
          return { cartItems: updatedCartItems };
        } else {
          const updatedCartItems = [...state.cartItems, product];
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
          return { cartItems: updatedCartItems };
        }
      }),

    updateCartItemQuantity: (productKey, quantity) =>
      set((state) => {
        const updatedCartItems = state.cartItems.map((item) =>
          item.key === productKey ? { ...item, quantity } : item
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return { cartItems: updatedCartItems };
      }),

    removeCartItem: (productKey) =>
      set((state) => {
        const updatedCartItems = state.cartItems.filter((item) => item.key !== productKey);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return { cartItems: updatedCartItems };
      }),
  };
});

export { useStore };
