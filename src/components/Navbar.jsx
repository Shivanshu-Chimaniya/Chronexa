import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import {Link, useNavigate} from "react-router-dom";
import "./Navbar.css";
import {useFirebase} from "../context/firebase";

export default function () {
	let firebase = useFirebase();
	let firebaseAuth = firebase.firebaseAuth;
	let [isSignedin, setIsSignedin] = useState(firebase.getUser());
	let navigate = useNavigate();

	let handleSignout = async () => {
		let user = firebase.getUser();
		if (user != null) {
			await firebase.signOut();
			setIsSignedin(false);
			navigate("/");
		} else {
			alert("Not Logged in");
		}
	};

	useEffect(() => {
		firebaseAuth.onAuthStateChanged(function (user) {
			if (user) {
				setIsSignedin(user);
			} else {
				setIsSignedin(null);
			}
		});
	}, [isSignedin, firebase, firebaseAuth, firebaseAuth.onAuthStateChanged]);

	return (
		<nav>
			<div className="nav__header">
				<div className="nav__logo">
					<Link to="/">Chronexa</Link>
				</div>
				<div
					className="nav__menu__btn"
					id="menu-btn"
					onClick={(e) => {
						let navLinks = document.querySelector("#nav-links");
						let menuBtnIcon = document.querySelector("i");
						navLinks.classList.toggle("open");

						const isOpen = navLinks.classList.contains("open");
						menuBtnIcon.setAttribute(
							"class",
							isOpen ? "ri-close-line" : "ri-menu-line"
						);
					}}>
					<i className="ri-menu-line"></i>
				</div>
			</div>
			<ul
				className="nav__links"
				id="nav-links"
				onClick={(e) => {
					let navLinks = document.querySelector("#nav-links");
					let menuBtnIcon = document.querySelector("i");
					navLinks.classList.remove("open");
					menuBtnIcon.setAttribute("class", "ri-menu-line");
				}}>
				<li>
					<Button variant="text" onClick={() => navigate("/capsule")}>
						HOME
					</Button>
				</li>
				<li>
					<Button
						variant="text"
						onClick={() => navigate("/capsule/create")}>
						CREATE
					</Button>
				</li>
				{isSignedin == null ? (
					<li className="dropdownUserBtns">
						<Button
							variant="text"
							onClick={() => navigate("/signin")}>
							SIGNIN
						</Button>
						or
						<Button
							variant="text"
							onClick={() => navigate("/register")}>
							REGISTER
						</Button>
					</li>
				) : (
					<li className="dropdownUserBtns">
						<Button
							variant="text"
							onClick={() => navigate("/capsule/create")}>
							SIGNOUT
						</Button>
					</li>
				)}
			</ul>
			<div className="nav__btns">
				{
					isSignedin == null ? (
						<>
							<Button
								id="nav-links"
								variant="text"
								onClick={() => navigate("/signin")}>
								SIGNIN
							</Button>
							or
							<Button
								id="nav-links"
								variant="text"
								onClick={() => navigate("/register")}>
								REGISTER
							</Button>
						</>
					) : (
						<Button
							variant="text"
							id="nav-links"
							onClick={handleSignout}>
							SIGNOUT
						</Button>
					)
					// (isSignedin == null) ? () : (<span>hii</span>)
				}
			</div>
		</nav>
	);
}
