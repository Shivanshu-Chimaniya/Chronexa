import {useNavigate, useRouteError} from "react-router-dom";
import Navbar from "../components/Navbar";
import {Button} from "@mui/material";
import ErrorImage from "../assets/errorImage.png";

export default function ErrorPage() {
	const navigate = useNavigate();
	const error = useRouteError();
	console.error(error);

	return (
		<>
			<Navbar />

			<div style={{width: "100%"}}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<img
						className="no-content-image"
						src={ErrorImage}
						alt="No Content Image"
					/>
					<h1>Oops!</h1>
					<p>Sorry, an unexpected error has occurred.</p>

					<p>
						Error : <i>{error.statusText || error.message}</i>
					</p>
					<br />
					<Button
						variant="outlined"
						onClick={() => {
							navigate("/");
						}}>
						Go To Landing Page
					</Button>
				</div>
			</div>
		</>
	);
}
