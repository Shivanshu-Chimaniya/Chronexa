import "./LandingPage.css";
import {useFirebase} from "../context/firebase";
import Image1 from "../assets/time-capsule-1.jpg";
import Image2 from "../assets/time-capsule-2.png";
import {useNavigate} from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import {Link} from "react-router-dom";
import HowItWorks from "../components/HowItWorks";
import ClockSection from "../components/ClockSection.jsx";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export default function Home() {
	const navigate = useNavigate();
	return (
		<div className="Home">
			<div className="container">
				<div className="container__left">
					<h2>Preserve Memories</h2>
					<h1>Share the Future</h1>

					<div className="container__btn">
						<button
							className="btn"
							onClick={() => navigate("/capsule")}>
							Explore
						</button>
					</div>
				</div>
				<div className="container__right">
					<div className="images">
						<img src={Image1} alt="tent-1" className="tent-1" />
						<img src={Image2} alt="tent-2" className="tent-2" />
					</div>
					<div className="content">
						<h2>TIME CAPSULES</h2>
						<h3>Capture the Moments That Matter</h3>
						<p>
							Store your most cherished memories and share them
							with loved ones in the future. Whether it's a
							message for future generations or a snapshot of
							today's life, preserve these moments securely and
							beautifully. Open your time capsule whenever you
							choose, or set a date to reveal the memories in
							years to come.
						</p>
					</div>
				</div>
				<div className="location">
					<span>
						<LocationOnIcon />
					</span>
					OUR LOCATION
				</div>
				<div className="socials">
					<span>
						<Link to="https://github.com/Shivanshu-Chimaniya">
							<GitHubIcon />
						</Link>
					</span>
				</div>
			</div>
			<div className="sec-contaniers container1">
				<h1>How It Works</h1>
				<HowItWorks />
			</div>
			<div className="sec-contaniers container2">
				<ClockSection />
			</div>
		</div>
	);
}
