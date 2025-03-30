import { lazy } from "react"

import BookVerseLanding from "./pages/LandingPage"
import { element } from "prop-types"
const Login = lazy(()=> import('./pages/Login'))
const Signup = lazy(()=> import('./pages/Signup'))
const Books = lazy(()=> import('./pages/Books'))
const Home = lazy(()=> import('./pages/Home'))
const Profiles = lazy(()=> import('./pages/Profiles'))
const About = lazy(()=> import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))
const BookDetails = lazy(()=> import('./pages/BookDetails'))


export const appRoutes = [
	{path:"/", element: BookVerseLanding },
	{path: "*", element: NotFound},
	{path: "/signup", element:Signup},
	{path: "/login", element:Login},
	{path: "/about", element: About},
	{path: "/profile", element: Profiles, requireAuth: true},
	{path: "/dashboard", element: Home},
	{path: "/dashboard/bookDetails/:bookTitle", element: BookDetails}
]