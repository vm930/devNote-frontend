import React, { Component } from 'react';

class LogIn extends Component {
	state = {
		user: ''
	};

	handleChange = (e) => {
		this.setState(
			{
				username: e.target.value
			},
			() => {
				console.log(this.state.username);
			}
		);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.getUser(this.state.username);
		this.props.history.push('/');
	};

	render() {
		return (
			<div>
				<h3>Log into devNote</h3>
				<h5>Or Create Account</h5>
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
		);
	}
}

export default LogIn;
