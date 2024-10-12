import {
	Button,
	Container,
	CssBaseline,
	TextField,
	Typography,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useFirebase} from "../context/firebase";

import dayjs from "dayjs";
import {DemoContainer, DemoItem} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {MobileDateTimePicker} from "@mui/x-date-pickers/MobileDateTimePicker";

import JoditEditor from "jodit-react";
import "./CreateCapsulePage.css";

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
const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

export default function CreateCapsulePage() {
	const firebase = useFirebase();
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [openDate, setOpenDate] = useState(Date.now());
	const [content, setContent] = useState("");
	const [coverPic, setCoverPic] = useState("");
	const [coverPicUrl, setCoverPicUrl] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const editor = useRef(null);

	useEffect(() => {
		if (!firebase.user) {
			alert("must be signed in");
			navigate("/signin");
		}
	}, [firebase, navigate]);

	const handleSubmit = async (e) => {
		setIsUploading(true);
		e.preventDefault();

		if (firebase.getUser() == null) {
			alert("must be signed in");
			navigate("/signin");
		}

		await firebase.addCapsule(title, openDate, content, coverPic);
		setIsUploading(false);
		alert("capsule added");
		navigate("/capsule");
	};

	let handleCoverPicChange = (e) => {
		if (e == null || e.target == null || e.target.files[0] == null) return;
		let res = URL.createObjectURL(e.target.files[0]);

		setCoverPic(e.target.files[0]);
		setCoverPicUrl(res);
	};
	let handleNewDate = (newDate) => {
		let aNewDate = new Date(newDate);
		setOpenDate(aNewDate.getTime());
	};

	const config = {
		readonly: false, // all options from https://xdsoft.net/jodit/doc/
		height: 400,
	};

	return (
		<Container component="main" maxWidth="lg">
			<CssBaseline />
			<div style={{padding: "2rem 0 5rem 0"}}>
				<Typography component="h1" variant="h5">
					Create Time Capsule
				</Typography>
				<form
					noValidate
					style={{width: "100%"}}
					onSubmit={handleSubmit}>
					<br />
					<div className="input-container">
						<div className="left-inputs">
							<div>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="title"
									label="title"
									name="title"
									autoFocus
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</div>
							<div style={{}}>
								<LocalizationProvider
									dateAdapter={AdapterDayjs}>
									<DemoContainer
										components={[
											"DateTimePicker",
											"MobileDateTimePicker",
											"DesktopDateTimePicker",
											"StaticDateTimePicker",
										]}>
										<DemoItem label="Pick Opening Date and Time">
											<MobileDateTimePicker
												value={dayjs(openDate)}
												onChange={(newDate) =>
													handleNewDate(newDate)
												}
											/>
										</DemoItem>
									</DemoContainer>
								</LocalizationProvider>
							</div>
							<div
								style={{
									height: 85,
									display: "flex",
									flexDirection: "column",
									paddingTop: "0.75rem",
									paddingBottom: "0.25rem",
								}}>
								<label
									className="file-input-label"
									htmlFor="file-input">
									Cover Pic:
								</label>
								<div className="file-input-container">
									<input
										className="file-input"
										id="file-input"
										type="file"
										onChange={(e) =>
											handleCoverPicChange(e)
										}
									/>
								</div>
							</div>
						</div>
						<div className="right-image-preview">
							{coverPicUrl ? (
								<>
									<img
										className="preview-cover-pic"
										src={coverPicUrl}
										alt="cover image"
									/>
								</>
							) : (
								<p style={{width: "100%", textAlign: "center"}}>
									Preview Image
								</p>
							)}
						</div>
					</div>
					<div style={{marginTop: "2rem", marginBottom: "2rem"}}>
						<label>
							Main Content:
							<JoditEditor
								ref={editor}
								value={content}
								config={config}
								tabIndex={1}
								onBlur={(newContent) => setContent(newContent)}
							/>
						</label>
					</div>
					<div style={{width: "180px"}}>
						{isUploading ? (
							<Button
								disabled
								type="submit"
								fullWidth
								variant="contained"
								color="primary">
								Creating...
							</Button>
						) : (
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary">
								Create Capsule
							</Button>
						)}
					</div>
				</form>
			</div>
			{/* <Box mt={8}>
				<Copyright />
			</Box> */}
		</Container>
	);
}
