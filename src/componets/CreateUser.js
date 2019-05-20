import React, { Component } from 'react';

class CreateUser extends Component {
	state = {
		userName: '',
		password: '',
		fullName: '',
		bio: '',
		email: '',
		avatarUrl: ''
	};

	handleChange = (e) => {
		console.log(e.target.value);
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
	};

	render() {
		return (
			<React.Fragment>
				<h1>Create Account</h1>
				<h3>Already have an account? Log In</h3>

				<form onChange={this.handleChange} onSubmit={this.handleSubmit}>
					<input type="text" name="userName" value={this.state.userName} placeholder="User Name" />
					<br />
					<input type="password" name="password" value={this.state.password} placeholder="password" />
					<br />
					<input type="text" name="fullName" value={this.state.fullName} placeholder="full Name" />
					<br />
					<input type="text" name="email" value={this.state.email} placeholder="email address" />
					<br />
					<input type="text" name="bio" value={this.state.bio} placeholder="something about you" />
					<br />
					<input
						type="text"
						name="avatarUrl"
						value={this.state.avatarUrl}
						placeholder="upload an image url here"
					/>
					<br />
					<input type="submit" value="Create Account" />
				</form>
			</React.Fragment>
		);
	}
}

export default CreateUser;
