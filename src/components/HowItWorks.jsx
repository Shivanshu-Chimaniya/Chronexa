import "./HowItWorks.css";

const Card = ({number, title, description}) => {
	return (
		<div className={number % 2 == 0 ? "card card1" : "card card2"}>
			<div className="card-number">{number}</div>
			<h3 className="card-title">{title}</h3>
			<p className="card-description">{description}</p>
		</div>
	);
};

export default function HowItWorks() {
	const steps = [
		{
			number: 1,
			title: "Create",
			description: "Write a message, upload photos, or videos.",
		},
		{
			number: 2,
			title: "Set a Timer",
			description: "Choose when your time capsule will be opened.",
		},
		{
			number: 3,
			title: "Unlock",
			description: "Capsules are opened when the time is right!",
		},
	];

	return (
		<div className="how-it-works-container">
			{steps.map((step, index) => (
				<Card
					key={index}
					number={step.number}
					title={step.title}
					description={step.description}
				/>
			))}
		</div>
	);
}
