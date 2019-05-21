import React, { Component } from 'react';

export default class UserNav extends Component {
	handleClick = (e) => {
		const noteId = parseInt(e.target.dataset.id);
		const noteTitle = e.target.innerText;
		this.props.getNoteId(noteId);
		this.props.getNoteTitle(noteTitle);
	};
	render() {
		console.log(this.props.currentUser);
		return (
			<React.Fragment>
				{this.props.currentUser ? (
					<React.Fragment>
						<img src={`${this.props.currentUser.vatar_url}`} />
						<h4>{this.props.currentUser.full_name}</h4>
						<h4>{this.props.currentUser.user_name}</h4>
						<h4>{this.props.currentUser.email}</h4>
						<h4>{this.props.currentUser.bio}</h4>
						<ul>
							{this.props.currentUser.notes.map((note) => {
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
