import React from "react";
import Clock from "./Clock";
import "./ClockSection.css";

const FlexboxSection = () => {
	return (
		<div className="flexbox-container">
			<div className="left-section">
				<Clock />
			</div>

			<div className="right-section">
				<h2 className="right-heading">Why Create a Time Capsule?</h2>
				<ul className="right-points">
					<li>Preserve memories for future reflection.</li>
					<li>Capture important milestones in your life.</li>
					<li>Share your story with loved ones or the world.</li>
					<li>Record hopes, dreams, and thoughts for the future.</li>
					<li>
						Mark a special moment that will be unlocked in time.
					</li>
				</ul>
			</div>
		</div>
	);
};

export default FlexboxSection;
