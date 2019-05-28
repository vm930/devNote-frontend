import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
	render() {
		return (
			<div className="welcome-container">
				<div className="navbar">
					<Link to="/">
						<img className="applogo" alt="logo" src="devNote.png" />
					</Link>
					<div className="navbar-login">
						<Link to="/login" className="navLogIn">
							{' '}
							Log In
						</Link>
						<Link className="navStart" to="/signup">
							get started
						</Link>
					</div>
				</div>

				<h3 className="heading-tertiary">A note taking app made by developers.</h3>
				<h3 className="heading-tertiary heading-tertiary--2">for developers.</h3>
				<div className="main-content
				">
					<div className="project-showcase">
						place holder
						<img src="" alt="project here" />
					</div>
				</div>
				<footer className="page-footer">
					<div className="footer-links">
						<Link className="footer-link" to="/">
							source
						</Link>
						<Link className="footer-link" to="/">
							feedback
						</Link>
						<Link className="footer-link" to="/">
							about
						</Link>
					</div>
					<p className="footer-project">
						{' '}
						a project by{' '}
						<Link className="Vicky" to="/">
							{' '}
							VickysDailyStandup
						</Link>
					</p>
				</footer>
			</div>
		);
	}
}

export default Welcome;
