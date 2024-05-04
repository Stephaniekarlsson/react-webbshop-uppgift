import { create } from 'zustand'

const useStore = create((set) => ({
  productList: [],
  cartItems: [],

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
        return { cartItems: updatedCartItems };
      } else {
        return { cartItems: [...state.cartItems, product] };
      }
    }),

  updateCartItemQuantity: (productKey, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.key === productKey ? { ...item, quantity } : item
      ),
    })),

  removeCartItem: (productKey) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.key !== productKey),
    })),
}));

export { useStore };



// const useCartStore = create((set) => ({
//   cartItems: [],
//   addToCart: (product) =>
//     set((state) => ({ cartItems: [...state.cartItems, product] })),
//   removeFromCart: (product) =>
//     set((state) => ({
//       cartItems: state.cartItems.filter((item) => item.key !== product.key),
//     })),
// }));

// useCartStore.subscribe(
//   (state) => {
//     localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
//   },
//   (state) => state.cartItems
// );

// const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
// if (storedCartItems) {
//   useCartStore.setState({ cartItems: storedCartItems });
// }

// const useQuantityStore = create((set, get) => {
//   const quantities = {};

//   return {
//     getQuantity: (productKey) => quantities[productKey] || 0,
//     setQuantity: (productKey, quantity) => {
//       quantities[productKey] = quantity;
//     },
//   };
// });

// export { useCartStore, useQuantityStore };

