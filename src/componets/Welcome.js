import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
	render() {
		return (
			<div>
				<nav>
					{/* <div id="navbar">
						<img alt="logo" className="logo" /> */}
					<Link className="navStart" to="/signup">
						get started
					</Link>
					<Link to="/login" className="navLogIn">
						{' '}
						Log In
					</Link>
				</nav>
				<div className="welcome">welcome</div>
			</div>
		);
	}
}

export default Welcome;
