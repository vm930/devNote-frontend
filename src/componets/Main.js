import React, { Component } from 'react';
// import { Connect } from 'react-redux';
import Code from './Code';
import Note from './Note';
import UserNav from './UserNav';

export default class Main extends Component {
	state = {
		noteId: null,
		noteTitle: null
	};

	handleClick = () => {
		this.props.logout();
	};

	getNoteId = (noteId) => {
		this.setState({
			noteId: noteId
		});
	};

	getNoteTitle = (noteTitle) => {
		this.setState({
			noteTitle: noteTitle
		});
	};

	render() {
		return (
			<React.Fragment>
				<nav>
					<div id="navbar">
						<img className="logo" />
						<button onClick={this.handleClick}>Log Out</button>
					</div>
				</nav>
				<div className="main-page">
					<UserNav
						currentUser={this.props.currentUser}
						getNoteId={this.getNoteId}
						getNoteTitle={this.getNoteTitle}
						notes={this.props.notes}
					/>
					<div className="code-and-note">
						<Note
							updateNote={this.props.updateNote}
							addNewNote={this.props.addNewNote}
							deleteNote={this.props.deleteNote}
							notes={this.props.notes}
							noteId={this.state.noteId}
							noteTitle={this.state.noteTitle}
							currentUser={this.props.currentUser}
							currentUserId={this.props.currentUserId}
						/>
						<Code />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

// export default connect()(Main)
