import React, {useEffect, useState} from "react";
import Countdown from "../components/Timer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Like from "@mui/icons-material/FavoriteBorder";
import Liked from "@mui/icons-material/Favorite";
import {useParams} from "react-router-dom";
import {useFirebase} from "../context/firebase";
import LockedGif from "../assets/LockedBg.gif";
import Skeleton from "@mui/material/Skeleton";

const CapsulePage = () => {
	const params = useParams();
	const firebase = useFirebase();

	const [data, setData] = useState(null);
	const [isLocked, setIsLocked] = useState(true);
	const [coverPicURL, setCoverPicURL] = useState(null);
	const [isDataLoding, setIsDataLoading] = useState(true);
	// const [liked, setLiked] = useState(false);

	useEffect(() => {
		let getData = async () => {
			let res = await firebase.getCapsuleById(params.capsuleId);
			let resData = res.data();
			setData(resData);
			setIsLocked(new Date(resData.openDate) > Date.now());
			setIsDataLoading(false);
		};
		getData();
	}, []);

	useEffect(() => {
		let getData = async () => {
			if (!data || !data.hasOwnProperty("coverPic")) {
				return;
			}
			const imageURL = data.coverPic;
			firebase.getImageURL(imageURL).then((url) => setCoverPicURL(url));
		};
		getData();
	}, [data]);

	useEffect(() => {
		let requestContent = async () => {
			if (isLocked) return;
			if (!data || !data.hasOwnProperty("content")) return;
			if (new Date(data.openDate) > Date.now()) return;

			let res = await firebase.getCapsuleContent(data.content);
			let resData = res.data();
			let ContentParagraph = document.querySelector("#ContentParagraph");
			ContentParagraph.innerHTML = resData.content;
		};
		requestContent();
	}, [data]);

	let requestContent = async () => {
		if (isLocked) return null;
		if (!data) return;
		if (new Date(data.openDate) > Date.now()) return;
		let res = await firebase.getCapsuleContent(data.content);
		let resData = res.data();
		let ContentParagraph = document.querySelector("#ContentParagraph");
		ContentParagraph.innerHTML = resData.content;
		return resData.content;
	};

	let title = data?.title || "Placeholder Title";
	let coverImage = coverPicURL;
	let unlockDate = new Date(data?.openDate);

	// const handleLike = () => {
	// 	setLiked(!liked);
	// };

	return (
		<div style={{padding: "20px", maxWidth: "800px", margin: "0 auto"}}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				{isDataLoding ? (
					<>
						<Skeleton
							variant="text"
							sx={{fontSize: "1.5rem", minWidth: "150px"}}
							animation="wave"
						/>
					</>
				) : (
					<>
						<Typography component="div" variant="h5">
							{title}
						</Typography>
					</>
				)}

				<Button variant="text">Share</Button>
			</div>

			<div
				style={{
					position: "relative",
					margin: "20px 0",
					width: "760px",
					height: "475px",
					overflow: "hidden",
				}}>
				{isLocked ? (
					// locked
					<div
						style={{
							position: "relative",
							width: "760px",
							height: "475px",
							overflow: "hidden",
						}}>
						<img
							src={LockedGif}
							alt="Locked Capsule"
							style={{width: "100%", opacity: 0.5}}
						/>
						<div
							style={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								backgroundColor: "rgba(0, 0, 0, 0.5)",
								color: "white",
								padding: "10px",
								borderRadius: "5px",
							}}>
							<Countdown targetDate={unlockDate} />
						</div>
					</div>
				) : (
					// unlocked
					<img
						src={coverImage}
						alt="Capsule Cover"
						style={{width: "100%"}}
					/>
				)}
			</div>

			{!isLocked && (
				<div style={{margin: "20px 0"}}>
					<p id="ContentParagraph"></p>
				</div>
			)}

			{/* <div style={{margin: "20px 0"}} onClick={handleLike}>
				{liked ? (
					<>
						<Liked />
						Liked
					</>
				) : (
					<>
						<Like />
						Like
					</>
				)}
			</div> */}

			{/* <div>
				<h3>Comments</h3>
				<textarea
					placeholder="Leave a comment..."
					style={{
						width: "100%",
						height: "80px",
						padding: "10px",
						marginBottom: "10px",
						borderRadius: "5px",
						border: "1px solid #ccc",
					}}
				/>
				<button style={{padding: "10px 20px", cursor: "pointer"}}>
					Submit
				</button>
			</div> */}
		</div>
	);
};

export default CapsulePage;
