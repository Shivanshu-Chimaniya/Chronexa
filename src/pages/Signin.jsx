import LockIcon from "@mui/icons-material/Lock";
import {
	Avatar,
	Button,
	Container,
	CssBaseline,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useFirebase} from "../context/firebase";

// function Copyright() {
// 	return (
// 		<Typography variant="body2" color="textSecondary" align="center">
// 			{"Copyright © "}
// 			<Link color="inherit" href="https://mui.com/">
// 				Your Website
// 			</Link>{" "}
// 			{new Date().getFullYear()}
// 			{"."}
// 		</Typography>
// 	);
// }

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const firebase = useFirebase();
	const navigate = useNavigate();

	useEffect(() => {
		if (firebase.user) {
			navigate("/");
		}
	}, [firebase, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await firebase.signinUserWithEmailAndPassword(
			email,
			password
		);
		navigate("/");
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<Avatar
					style={{
						margin: "0.25rem",
						backgroundColor: "blue",
					}}>
					<LockIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form
					noValidate
					style={{width: "100%"}}
					onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{/* <FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/> */}
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary">
						Sign in
					</Button>
					<Grid container justifyContent="space-between">
						<Grid>
							{/* <Link href="#" variant="body2">
								Forgot password?
							</Link> */}
						</Grid>
						<Grid>
							<Link
								onClick={() => navigate("/register")}
								variant="body2">
								{"Don't have an account? register"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			{/* <Box mt={8}>
				<Copyright />
			</Box> */}
		</Container>
	);
}
