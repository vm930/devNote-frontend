import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import ReactTooltip from 'react-tooltip';
import { cog } from 'react-icons-kit/icomoon/cog';
import { pacman } from 'react-icons-kit/icomoon/pacman';
import { envelop } from 'react-icons-kit/icomoon/envelop';
import { bubble } from 'react-icons-kit/icomoon/bubble';
import { quill } from 'react-icons-kit/icomoon/quill';

export default class UserNav extends Component {
	handleClick = (e) => {
		const noteId = parseInt(e.target.dataset.id);
		const noteTitle = e.target.innerText;
		this.props.getNoteId(noteId);
		this.props.getNoteTitle(noteTitle);
	};

	handleSetting = () => {
		console.log('im clicked');
		//i should open the modal
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

							<span className="card-title">
								{this.props.currentUser.full_name}
								<ReactTooltip />
								<Icon onClick={this.handleSetting} data-tip="Edit Profile" id="setting" icon={cog} />
							</span>

							<div className="card-content">
								<p>
									<Icon icon={pacman} />
									{this.props.currentUser.user_name}
								</p>

								<p>
									<Icon icon={envelop} />
									{this.props.currentUser.email}
								</p>

								<p>
									<Icon icon={bubble} />
									{this.props.currentUser.bio}
								</p>
							</div>
							<ul className="notes-title">
								{this.props.notes.map((note) => {
									return (
										<li key={note.id} data-id={note.id} onClick={this.handleClick}>
											<Icon icon={quill} />
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
