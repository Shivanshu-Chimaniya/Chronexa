import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {useTheme} from "@mui/material/styles";
import React from "react";

import "./Capsule.css";

import Skeleton from "@mui/material/Skeleton";

export default function CapsuleSkeleton() {
	const theme = useTheme();

	return (
		<Card sx={{display: "flex"}}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "250px",
				}}>
				<CardContent>
					<Skeleton
						variant="text"
						sx={{fontSize: "1.5rem"}}
						animation="wave"
					/>

					<Skeleton
						variant="text"
						sx={{fontSize: "1rem"}}
						animation="wave"
					/>
				</CardContent>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						pl: 1,
						pb: 1,
					}}>
					<Skeleton
						variant="text"
						sx={{fontSize: "1rem", minWidth: "150px"}}
						animation="wave"
					/>
				</Box>
			</Box>
			<Skeleton
				variant="rectangular"
				width={151}
				height={151}
				animation="wave"
			/>
		</Card>
	);
}
