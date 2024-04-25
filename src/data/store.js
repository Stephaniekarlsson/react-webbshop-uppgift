import { create } from 'zustand'

// set, create

const useStore = create(set => ({
	productList: [],

	setProducts: newProducts => set(state => ({
		productList: newProducts
	})),
	// increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),

	// addEmployee: employee => set(state => ({
	// 	employees: [ ...state.employees, employee ]
	// }))
}))


export { useStore }