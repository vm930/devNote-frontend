import React, { Component } from 'react';
import { set } from 'immutable';

export default class UserNav extends Component {
	state = {
		currentUser: null,
		currentUserId: parseInt(localStorage.getItem('userId')),
		noteId: null
	};

	componentDidMount() {
		fetch(`http://localhost:3000/users/${this.state.currentUserId}`).then((res) => res.json()).then((json) => {
			this.setState({
				currentUser: json
			});
		});
	}

	handleClick = (e) => {
		const noteId = parseInt(e.target.dataset.id);
		// console.log(this.state.currentUser.notes);
		this.props.getNoteId(noteId);
	};
	render() {
		return (
			<React.Fragment>
				{this.state.currentUser ? (
					<React.Fragment>
						<img src={`${this.state.currentUser.vatar_url}`} />
						<h4>{this.state.currentUser.full_name}</h4>
						<h4>{this.state.currentUser.user_name}</h4>
						<h4>{this.state.currentUser.email}</h4>
						<h4>{this.state.currentUser.bio}</h4>
						<ul>
							{this.state.currentUser.notes.map((note) => {
								return (
									<li key={note.id} data-id={note.id} onClick={this.handleClick}>
										{note.title}
									</li>
								);
							})}
						</ul>
					</React.Fragment>
				) : (
					<div>loading!</div>
				)}
			</React.Fragment>
		);
	}
}
