import React, {useState} from "react";
import "./Clock.css";

function Clock() {
	const monthList = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	let [year, setYear] = useState();
	let [hours, setHour] = useState();
	let [minutes, setMinutes] = useState();
	let [seconds, setSeconds] = useState();
	let [days, setDays] = useState();
	let [months, setMonths] = useState();
	let [monthDates, setMonthDate] = useState();
	let session = "PM";
	setInterval(() => {
		let date = new Date();
		let hour = date.getHours();
		setHour(hour);
		let minute = date.getMinutes();
		setMinutes(minute);
		let second = date.getSeconds();
		setSeconds(second);
		let day = date.getDay();
		setDays(day);
		let month = date.getMonth();
		setMonths(month);
		let monthDate = date.getDate();
		setMonthDate(monthDate);
		let year = date.getFullYear();
		setYear(year);
	});
	let daay = dayList[days];
	let monthh = monthList[months];

	if (hours < 12) {
		session = "AM";
	}
	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	return (
		<div className="clock-container">
			<div className="hourContainer">
				<div className="hours">{hours + ":"}</div>
				<div className="minutes">{minutes + ":"}</div>
				<div className="seconds">{seconds}</div>
				<p className="session">{session}</p>
			</div>
			<p className="year">
				{daay},{monthh} {monthDates} {year}
			</p>
		</div>
	);
}

export default Clock;
