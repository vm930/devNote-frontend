import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		fetch('http://localhost:3000/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({
				user_name: this.state.userName,
				full_name: this.state.fullName,
				email: this.state.email,
				avatar_url: this.state.avatarUrl,
				bio: this.state.bio
			})
		})
			.then((res) => res.json())
			.then(console.log);

		this.setState({
			userName: '',
			password: '',
			fullName: '',
			bio: '',
			email: '',
			avatarUrl: ''
		});
	};

	render() {
		return (
			<React.Fragment>
				<div className="handleSignIn">
					<h3>Create Account</h3>
					<h6>
						Already have an account?
						<Link to="/login"> Log In</Link>
					</h6>
				</div>
				<div className="create-account">
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
				</div>
			</React.Fragment>
		);
	}
}

export default CreateUser;
