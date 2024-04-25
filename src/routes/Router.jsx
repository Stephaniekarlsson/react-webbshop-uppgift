import { createHashRouter } from 'react-router-dom'
import Root from './Root.jsx'
import Home from './Home.jsx';
import Product from './Product.jsx';
import Cart from './Cart.jsx';

const router = createHashRouter([
	{
		path: "/",

		element: <Root />,

		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/product',
				element: <Product />
			},
			{
				path: '/cart',
				element: <Cart />
			},
		]
	},

]);

export { router }