import React, {useState, useEffect} from "react";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Image from "../assets/LockedBg.gif";
// import UnlockImage from "../assets/unlock.png";
import LockImage from "../assets/lock.png";
import Timer from "../components/Timer";
import Skeleton from "@mui/material/Skeleton";

import "./Capsule.css";
import {useNavigate} from "react-router-dom";
import {useFirebase} from "../context/firebase";

export default function MediaControlCard({
	id,
	title,
	openDate,
	displayName,
	coverPic,
}) {
	const navigate = useNavigate();
	const firebase = useFirebase();
	const [locked, setLocked] = useState(true);
	const [url, setURL] = useState(null);

	useEffect(() => {
		if (coverPic) {
			firebase.getImageURL(coverPic).then((url) => setURL(url));
		}
	}, []);

	const styles = {
		media: {
			height: 0,
			paddingTop: "56.25%",
		},
		card: {
			position: "relative",
		},
	};

	let handleClick = () => {
		navigate("/capsule/" + id);
	};

	useEffect(() => {
		if (new Date(openDate) < Date.now()) {
			setLocked(false);
		} else {
		}
	}, []);

	const theme = useTheme();

	return (
		<Card sx={{display: "flex"}} style={styles.card} onClick={handleClick}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "250px",
				}}>
				<CardContent>
					<Typography component="div" variant="h5">
						{title}
					</Typography>
					<Typography
						variant="subtitle1"
						component="div"
						sx={{color: "text.secondary"}}>
						{displayName}
					</Typography>
				</CardContent>
				<Box
					sx={{
						maxWidth: "150px",
						paddingLeft: "1rem",
					}}>
					<Timer targetDate={openDate} />
				</Box>
			</Box>
			{locked ? (
				// locked
				<>
					<CardMedia
						component="img"
						sx={{width: 151, height: 151}}
						image={Image}
						alt="Live from space album cover"
					/>
					<div className="gif-overlay">
						<img
							style={{width: "15%"}}
							src={LockImage}
							alt="Lock Image"
						/>
					</div>
				</>
			) : (
				// unlocked
				<>
					{url ? (
						<>
							<CardMedia
								component="img"
								sx={{width: 151, height: 151}}
								image={url}
								alt="Live from space album cover"
							/>
						</>
					) : (
						<Skeleton
							variant="rectangular"
							width={151}
							height={151}
							animation="wave"
						/>
					)}
				</>
			)}
		</Card>
	);
}
