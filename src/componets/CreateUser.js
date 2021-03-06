import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const URL = 'https://dev-note-backend.herokuapp.com';
// const URL = 'http://localhost:3000';

class CreateUser extends Component {
	state = {
		userName: '',
		password: '',
		fullName: '',
		bio: '',
		email: ''
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${URL}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({
				user_name: this.state.userName,
				password: this.state.password,
				password_confirmation: this.state.password,
				full_name: this.state.fullName,
				email: this.state.email,
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
			email: ''
		});

		this.props.history.push('/login');
	};

	render() {
		return (
			<React.Fragment>
				<Link to="/">
					<img src="devNote.png" alt="logo" className="applogo" />
				</Link>
				<div className="handleSignIn">
					<h3>Create Account</h3>
					<h6>
						Already have an account?
						<Link to="/login"> Log In</Link>
					</h6>
				</div>
				<div className="create-account create-acount--2">
					<form className="loginForm" onChange={this.handleChange} onSubmit={this.handleSubmit}>
						<input
							id="loginInput"
							type="text"
							name="userName"
							value={this.state.userName}
							placeholder="User Name"
							required
						/>

						<input
							id="loginInput"
							type="password"
							name="password"
							value={this.state.password}
							placeholder="Password"
							required
						/>

						<input
							id="loginInput"
							type="text"
							name="fullName"
							value={this.state.fullName}
							placeholder="Full Name"
							required
						/>

						<input
							id="loginInput"
							type="text"
							name="email"
							value={this.state.email}
							placeholder="Email Address"
							required
						/>

						<input
							id="loginInput"
							type="text"
							name="bio"
							value={this.state.bio}
							placeholder="something about you"
						/>
						{/* <input
							id="loginInput"
							type="text"
							name="avatarUrl"
							value={this.state.avatarUrl}
							placeholder="upload an image url here"
						/> */}

						<input className="loginBtn" type="submit" value="Create Account" />
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default CreateUser;
