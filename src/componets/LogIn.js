import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LogIn extends Component {
	state = {
		username: ''
	};

	handleChange = (e) => {
		this.setState({
			username: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.getUser(this.state.username);
		this.props.history.push('/');
	};

	render() {
		return (
			<React.Fragment>
				<div className="handleSignIn">
					<h5>Log into devNote</h5>
					<h6>
						Or
						<Link to="/signup"> Create Account</Link>
					</h6>
				</div>
				<div className="login-card">
					<form onSubmit={this.handleSubmit}>
						<input
							placeholder="User Name"
							onChange={this.handleChange}
							type="text"
							value={this.state.username}
						/>
						<input type="submit" value="Log In" />
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default LogIn;
