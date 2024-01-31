import React, { Component } from "react";
import logo from "./logo.svg";
import Card from "react-bootstrap/Card";
import "./App.css";

class App extends Component {
	constructor() {
		super();
		this.state = {
			person: {
				fullName: "Fahri",
				bio: "A web developer",
				imgSrc: logo,
				profession: "Software Engineer",
			},
			shows: false,
			timeSinceMount: 0,
			personDisplayTime: null, // Store the time when the Person component is displayed
		};
		this.intervalId = null; // Initialize intervalId to null
	}

	// Function to toggle the 'shows' state
	toggleShow = () => {
		if (!this.state.shows) {
			this.setState({
				personDisplayTime: new Date(), // Store the time when the Person component is displayed
			});
		}
		this.setState((prevState) => ({
			shows: !prevState.shows,
		}));
	};

	// Function to update timeSinceMount
	updateTimeInterval = () => {
		if (this.state.personDisplayTime) {
			const currentTime = new Date();
			const timeDifference = Math.round(
				(currentTime - this.state.personDisplayTime) / 1000
			); // Round to the nearest whole number
			this.setState({
				timeSinceMount: timeDifference,
			});
		}
	};

	// Lifecycle method: componentDidMount
	componentDidMount() {
		this.intervalId = setInterval(this.updateTimeInterval, 1000); // Update time interval every second
	}

	// Lifecycle method: componentWillUnmount
	componentWillUnmount() {
		clearInterval(this.intervalId); // Clear the interval when the component is unmounted
	}

	render() {
		const { person, shows, timeSinceMount } = this.state;

		return (
			<div className="App">
				<button onClick={this.toggleShow}>Toggle Profile</button>
				<br />
				{shows && (
					<div className="Person">
						<Card style={{ width: "18rem" }}>
							<Card.Img
								variant="top"
								src={person.imgSrc}
								alt={person.fullName}
							/>
							<Card.Body>
								<Card.Title>{person.fullName}</Card.Title>
								<Card.Text>{person.bio}</Card.Text>
								<Card.Text>{person.profession}</Card.Text>
							</Card.Body>
						</Card>
					</div>
				)}
				<p>Time since mount: {timeSinceMount} seconds</p>
			</div>
		);
	}
}

export default App;
