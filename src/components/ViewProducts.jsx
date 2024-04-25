import { getProducts } from "../data/crud.js"
// import { useStore } from '../data/store.js'
import { useState } from 'react'
import Products from "./Products.jsx"


const ViewProducts = ({ employee }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const setProducts = useStore(state => state.setProducts)

	return (
		<section className="row border-bottom alternate">
				<div>

        </div>
		</section>
	)
}

export default ViewProducts
