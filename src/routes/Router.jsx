import { createHashRouter } from 'react-router-dom'
import Root from './Root.jsx'
import Home from './Home.jsx';
import Product from './Product.jsx';
// import Cart from './Cart.jsx';
import SignIn from "../routes/SignIn.jsx"

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
				path: '/signIn',
				element: <SignIn />
			},
		]
	},

]);

export { router }