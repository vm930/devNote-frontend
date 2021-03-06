import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LogIn extends Component {
	state = {
		username: '',
		password: ''
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.getUser(this.state.username, this.state.password);
		this.props.history.push('/notes');
	};

	render() {
		return (
			<React.Fragment>
				<Link to="/">
					<img src="devNote.png" alt="logo" className="applogo" />
				</Link>

				<div className="handleSignIn">
					<h3>Log into devNote</h3>
					<h6>
						Or
						<Link to="/signup"> Create Account</Link>
					</h6>
				</div>
				<div className="login-card">
					<form onSubmit={this.handleSubmit} className="loginForm">
						<input
							id="loginInput"
							placeholder="User Name"
							onChange={this.handleChange}
							type="text"
							value={this.state.username}
							required
							name="username"
						/>
						<input
							id="loginInput"
							placeholder="Password"
							onChange={this.handleChange}
							type="password"
							value={this.state.password}
							name="password"
							required
						/>
						<input className="loginBtn" type="submit" value="Log In" />
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default LogIn;
