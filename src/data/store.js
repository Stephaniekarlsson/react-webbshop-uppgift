// store.js
import { create } from 'zustand';

const useStore = create((set) => {
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  let showProductForm = false;

  return {
    productList: [],
    cartItems: storedCartItems,
    isLoggedIn: storedIsLoggedIn,
    showProductForm,
    setShowProductForm: (value) => set({ showProductForm: value }),

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

      login: (username, password) => {
        // Lägg till loggmeddelande för att se inloggningsförsök
        console.log('Inloggning med användarnamn:', username);
        if (username === 'admin' && password === 'lösen') {
          console.log('Inloggning lyckades');
          set({ isLoggedIn: true });
          localStorage.setItem('isLoggedIn', JSON.stringify(true));
        } else {
          console.log('Inloggning misslyckades');
          set({ isLoggedIn: false }); 
          localStorage.removeItem('isLoggedIn');
        }
      },

    logout: () => {
      console.log('Utloggning');
      set({ isLoggedIn: false });
      localStorage.removeItem('isLoggedIn');
      
    },

  };
});

export { useStore };
