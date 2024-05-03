import { create } from 'zustand'

const useStore = create(set => ({
	productList: [],

	setProducts: newProducts => set(state => ({
		productList: newProducts
	})),

}))


export { useStore }

const useCartStore = create((set) => ({
	cartItems: [],
	addToCart: (product) =>
	  set((state) => ({ cartItems: [...state.cartItems, product] })),
	removeFromCart: (productId) =>
	  set((state) => ({
		cartItems: state.cartItems.filter((item) => item.id !== productId),
	  })),
  }));

  useCartStore.subscribe(
	(state) => {
	  localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
	},
	(state) => state.cartItems
  );

  const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
	if (storedCartItems) {
  		useCartStore.setState({ cartItems: storedCartItems });
}
  
export { useCartStore }

const useQuantityStore = create(() => {
    const quantities = {};
  
    return {
        getQuantity: (productKey) => quantities[productKey] || 0,
        setQuantity: (productKey, quantity) => {
            quantities[productKey] = quantity;
        },
    };
});

export { useQuantityStore }