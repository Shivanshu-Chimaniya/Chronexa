import React from "react";
import "./App.css";

import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import AllCapsules from "./pages/AllCapsules.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import RegisterPage from "./pages/Register.jsx";
import ShowCapsule from "./pages/ShowCapsule.jsx";
import SigninPage from "./pages/Signin.jsx";

import CreateCapsulePage from "./pages/CreateCapsulePage";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <ErrorPage />,
		element: (
			<>
				<Navbar />
				<div className="mobile-spacer"></div>
				<LandingPage />
			</>
		),
	},
	{
		path: "/signin",
		errorElement: <ErrorPage />,
		element: (
			<>
				<Navbar />
				<div className="mobile-spacer"></div>
				<SigninPage />
			</>
		),
	},
	{
		path: "/register",
		errorElement: <ErrorPage />,
		element: (
			<>
				<Navbar />
				<div className="mobile-spacer"></div>
				<RegisterPage />
			</>
		),
	},
	{
		path: "/capsule",
		errorElement: <ErrorPage />,
		element: (
			<>
				<Navbar />
				<div className="mobile-spacer"></div>
				<AllCapsules />
			</>
		),
	},
	{
		path: "/capsule/create",
		errorElement: <ErrorPage />,
		element: (
			<>
				<Navbar />
				<div className="mobile-spacer"></div>
				<CreateCapsulePage />
			</>
		),
	},
	{
		path: "/capsule/:capsuleId",
		errorElement: <ErrorPage />,
		element: (
			<>
				<Navbar />
				<div className="mobile-spacer"></div>
				<ShowCapsule />
			</>
		),
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
