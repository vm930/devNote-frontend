import React, { Component } from 'react';

export default class UserNav extends Component {
	handleButtonClick = (e) => {
		console.log('im clicked');
	};

	handleClick = (e) => {
		const noteId = parseInt(e.target.dataset.id);
		const noteTitle = e.target.innerText;
		this.props.getNoteId(noteId);
		this.props.getNoteTitle(noteTitle);
	};
	render() {
		return (
			<div className="card">
				<div className="user-profile">
					{this.props.currentUser || this.props.notes ? (
						<React.Fragment>
							<div className="card-image ">
								<img src={`${this.props.currentUser.avatar_url}`} />
							</div>
							<span className="card-title">{this.props.currentUser.full_name}</span>
							<button
								onClick={this.handleButtonClick}
								className="btn-floating halfway-fab waves-effect waves-light grey"
							>
								+
							</button>
							<div className="card-content">
								<h6>{this.props.currentUser.user_name}</h6>
								<h6>{this.props.currentUser.email}</h6>
								<h6>{this.props.currentUser.bio}</h6>
							</div>
							<ul className="notes-title">
								{this.props.notes.map((note) => {
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
				</div>
			</div>
		);
	}
}
