import React, {useEffect, useState} from "react";
import Skeleton from "@mui/material/Skeleton";

const Countdown = ({targetDate}) => {
	const [timeLeft, setTimeLeft] = useState({});
	const [isUnlocked, setIsUnlocked] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const distance = new Date(targetDate) - now;

			if (distance <= 0) {
				clearInterval(interval);
				setIsUnlocked(true); // When time is up, mark as unlocked
				return;
			}

			const years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
			const days = Math.floor(
				(distance % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
			);
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(distance % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((distance % 60000) / 1000);

			setTimeLeft({years, days, hours, minutes, seconds});
		}, 1000);

		return () => clearInterval(interval);
	}, [targetDate]);

	const renderCountdown = () => {
		if (isUnlocked) return "Unlocked"; // Display "Unlocked" if time is over

		const {years, days, hours, minutes, seconds} = timeLeft;
		if (typeof years == "undefined") {
			return (
				<Skeleton
					variant="text"
					sx={{fontSize: "1.5rem", minWidth: "150px"}}
					animation="wave"
				/>
			);
		}

		if (years > 2) return `${years} years left`;
		if (days > 1) return `${days} days left`;
		return `${hours}h ${minutes}m ${seconds}s left`;
	};
	return <p>{renderCountdown()}</p>;
};

export default Countdown;
