import { createHashRouter } from 'react-router-dom'
import Root from './Root.jsx'
import Home from './Home.jsx';
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
				path: '/signIn',
				element: <SignIn />
			},
		]
	},

]);

export { router }