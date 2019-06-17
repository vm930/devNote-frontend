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
						<img src="note-demo.png" alt="project demo display" />
					</div>
				</div>
				<footer className="page-footer">
					<div className="footer-links">
						<a className="footer-link" href="https://github.com/vm930/devNote-frontend" target="_blank">
							source code
						</a>
						<a className="footer-link" href="mailto:vickysdailystandup@gmail.com" target="_blank">
							feedback
						</a>
						<a className="footer-link" href="/" target="_blank">
							about
						</a>
					</div>
					<p className="footer-project">
						{' '}
						a project by{' '}
						<a className="Vicky" href="https://victoriamei.com" target="_blank">
							{' '}
							VickysDailyStandup
						</a>
					</p>
				</footer>
			</div>
		);
	}
}

export default Welcome;
