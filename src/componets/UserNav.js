import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import ReactTooltip from 'react-tooltip';
import { cog } from 'react-icons-kit/icomoon/cog';
import { pacman } from 'react-icons-kit/icomoon/pacman';
import { envelop } from 'react-icons-kit/icomoon/envelop';
import { bubble } from 'react-icons-kit/icomoon/bubble';
import { ic_bookmark } from 'react-icons-kit/md/ic_bookmark';
import Modal from 'react-responsive-modal';

const URL = 'http://localhost:3000';

export default class UserNav extends Component {
	state = {
		open: false,
		userName: '',
		password: '',
		fullName: '',
		bio: '',
		email: ''
	};

	onOpenModal = () => {
		this.setState({
			open: true,
			userName: this.props.currentUser.user_name,
			// password: this.props.currentUser.password,
			fullName: this.props.currentUser.full_name,
			email: this.props.currentUser.email,
			bio: this.props.currentUser.bio,
			avatar_url: ''
		});
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};

	handleClick = (e) => {
		const noteId = parseInt(e.target.dataset.id);
		const noteTitle = e.target.innerText;
		this.props.getNoteId(noteId);
		this.props.getNoteTitle(noteTitle);
		this.props.getCodeSnippet(noteId);
	};

	handleSetting = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		fetch(`${URL}/users/${this.props.currentUser.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
			body: JSON.stringify({
				user_name: this.state.userName,
				// password: this.state.password,
				// password_confirmation: this.state.password,
				full_name: this.state.fullName,
				email: this.state.email,
				bio: this.state.bio,
				avatar_url: this.state.avatar_url
			})
		})
			.then((res) => res.json())
			.then(console.log);
	};

	render() {
		const { open } = this.state;
		return (
			<div className="card">
				<div className="user-profile">
					{this.props.currentUser && this.props.notes ? (
						<React.Fragment>
							<div className="card-image">
								<img alt="user profile" src={`${this.props.currentUser.avatar_url}`} />
							</div>

							<span id="card-title">
								{this.props.currentUser.full_name}
								<ReactTooltip />
								<Icon data-tip="Edit Profile" id="setting" icon={cog} onClick={this.onOpenModal} />
								<Modal open={open} onClose={this.onCloseModal} center>
									<form
										className="loginForm"
										onChange={this.handleSetting}
										onSubmit={this.handleSubmit}
									>
										<input
											id="loginInput"
											type="text"
											name="userName"
											value={this.state.userName}
											placeholder="User Name"
										/>

										{/* <input
											id="loginInput"
											type="password"
											name="password"
											value={this.state.password}
											placeholder="Password"
										/> */}

										<input
											id="loginInput"
											type="text"
											name="fullName"
											value={this.state.fullName}
											placeholder="Full Name"
										/>

										<input
											id="loginInput"
											type="text"
											name="email"
											value={this.state.email}
											placeholder="Email Address"
										/>

										<input
											id="loginInput"
											type="text"
											name="bio"
											value={this.state.bio}
											placeholder="something about you"
										/>

										<input
											id="loginInput"
											type="text"
											name="avatarUrl"
											value={this.state.avatarUrl}
											placeholder="upload an image url here"
										/>

										<input className="loginBtn" type="submit" value="Save" />
									</form>
								</Modal>
							</span>

							<div className="card-content">
								<p id="userDetails">
									<Icon id="icon-user" icon={pacman} />
									{this.props.currentUser.user_name}
								</p>

								<p id="userDetails">
									<Icon id="icon-user" icon={envelop} />
									{this.props.currentUser.email}
								</p>

								<p id="userDetails">
									<Icon id="icon-user" icon={bubble} />
									{this.props.currentUser.bio}
								</p>
							</div>
							<ul className="notes-title">
								{this.props.notes.map((note) => {
									return (
										<li
											className="userNote"
											key={note.id}
											data-id={note.id}
											onClick={this.handleClick}
										>
											<Icon className="icon" icon={ic_bookmark} />
											{note.title}
										</li>
									);
								})}
							</ul>
						</React.Fragment>
					) : (
						<div>loading!</div>
					)}
				</div>
			</div>
		);
	}
}
