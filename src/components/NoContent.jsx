import React from "react";
import NoContentImage from "../assets/noContent.jpg";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import "./NoContent.css";

export default function NoContent() {
	const navigate = useNavigate();
	let handleClick = () => {
		navigate("/capsule/create");
	};
	return (
		<div style={{width: "100%"}}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<img
					className="no-content-image"
					src={NoContentImage}
					alt="No Content Image"
				/>
				<span>There is no result to show</span>
				<Button onClick={handleClick}>Make a time capsule</Button>
			</div>
		</div>
	);
}
