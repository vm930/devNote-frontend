import React, { Component } from 'react';

class LogIn extends Component {
	state = {
		user: ''
	};

	handleChange = (e) => {
		this.setState({
			user: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		// this.props.getUser(this.state.user);
		// this.props.history.push('/');
		console.log('hi imhere');
	};

	render() {
		return (
			<div>
				<h3>Log into devNote</h3>
				<h5>Or Create Account</h5>
				<form onSubmit={this.handleSubmit}>
					<input
						placeholder="Email Address"
						onChange={this.handleChange}
						type="text"
						value={this.state.user}
					/>
					<input type="submit" value="Log In" />
				</form>
			</div>
		);
	}
}

export default LogIn;
