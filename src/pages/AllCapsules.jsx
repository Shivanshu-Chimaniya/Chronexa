import React, {useEffect, useState} from "react";
import Capsule from "../components/Capsule";
import CapsuleSkeleton from "../components/CapsuleSkeleton";
import {useFirebase} from "../context/firebase";
import "./AllCapsules.css";
import {Typography} from "@mui/material";
import NoContent from "../components/NoContent";

export default function AllCapsules() {
	const firebase = useFirebase();
	let rawData;
	let [capsules, setCapsules] = useState([]);
	let [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let getCapsules = async () => {
			let result = await firebase.listAllCapsules();
			rawData = result;
			let allCapsules = [];

			result.forEach((doc) => {
				let data = doc.data();
				let id = doc.id;
				allCapsules.push({data, id});
			});

			setCapsules(allCapsules);
			setIsLoading(false);
		};
		getCapsules();
	}, [setCapsules]);

	return (
		<div className="capsule-container">
			<Typography component="div" variant="h5">
				All Timecapsules
			</Typography>
			<div className="allcapsules">
				{isLoading ? (
					<>
						<CapsuleSkeleton />
						<CapsuleSkeleton />
						<CapsuleSkeleton />
						<CapsuleSkeleton />
					</>
				) : (
					<>
						{capsules.length > 0 ? (
							<>
								{capsules.map((el) => (
									<Capsule
										key={el.id}
										id={el.id}
										coverPic={el.data.coverPic}
										title={el.data.title}
										openDate={el.data.openDate}
										displayName={el.data.displayName}
									/>
								))}
							</>
						) : (
							<NoContent />
						)}
					</>
				)}
			</div>
		</div>
	);
}

// content, displayName, openDate, photoURL, title, userEmail, userID;
