import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
	render() {
		return (
			<div>
				<Link to="/">
					<img className="applogo" alt="logo" src="devNote.png" />
				</Link>
				<h3>A note taking app made by developers. for developers.</h3>

				<Link className="navStart" to="/signup">
					get started
				</Link>
				<Link to="/login" className="navLogIn">
					{' '}
					Log In
				</Link>

				<div className="welcome
				">welcome</div>
				<footer className="page-footer">
					<div>
						<Link to="/">source</Link>
						<Link to="/">feedback</Link>
						<Link to="/">about</Link>
					</div>
					<p>
						{' '}
						a project by <Link to="/"> VickysDailyStandup</Link>
					</p>
				</footer>
			</div>
		);
	}
}

export default Welcome;
