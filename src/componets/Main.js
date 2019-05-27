import React, { Component } from 'react';
// import { Connect } from 'react-redux';
import Code from './Code';
import Note from './Note';
import UserNav from './UserNav';

export default class Main extends Component {
	state = {
		codes: null,
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

	getCodeSnippet = (noteId) => {
		if (noteId) {
			fetch(`http://localhost:3000/notes/${noteId}`).then((res) => res.json()).then((note) => {
				this.setState({
					codes: note.codes
				});
			});
		} else {
			alert('oops! No notes selected!');
		}
	};

	resetNote = () => {
		this.setState({
			codes: null,
			noteId: null,
			noteTitle: null
		});
	};

	getCodeTemplate = (noteid) => {
		this.setState({
			noteId: noteid
		});
	};

	render() {
		return (
			<React.Fragment>
				<nav>
					<div id="navbar">
						<img alt="logo" className="logo" />
						<button onClick={this.handleClick}>Log Out</button>
					</div>
				</nav>
				<div className="main-page">
					<UserNav
						currentUser={this.props.currentUser}
						getNoteId={this.getNoteId}
						getNoteTitle={this.getNoteTitle}
						notes={this.props.notes}
						getCodeSnippet={this.getCodeSnippet}
					/>
					<div className="code-and-note">
						<Note
							resetNote={this.resetNote}
							addNewNote={this.props.addNewNote}
							currentUser={this.props.currentUser}
							currentUserId={this.props.currentUserId}
							deleteNote={this.props.deleteNote}
							getCodeSnippet={this.getCodeSnippet}
							getCodeTemplate={this.getCodeTemplate}
							notes={this.props.notes}
							noteId={this.state.noteId}
							noteTitle={this.state.noteTitle}
							updateNote={this.props.updateNote}
						/>
						<Code
							codes={this.state.codes}
							getCodeSnippet={this.getCodeSnippet}
							noteId={this.state.noteId}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

// export default connect()(Main)
