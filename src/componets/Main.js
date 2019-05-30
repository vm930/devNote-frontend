import React, { Component } from 'react';
// import { Connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Code from './Code';
import Note from './Note';
import UserNav from './UserNav';

const URL = 'https://dev-note-backend.herokuapp.com';
// const URL = 'http://localhost:3000';

export default class Main extends Component {
	state = {
		codes: null,
		noteId: null,
		noteTitle: null,
		noteValue: ''
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
			fetch(`${URL}/notes/${noteId}`).then((res) => res.json()).then((note) => {
				this.setState({
					codes: note.codes
				});
			});
		} else {
			alert('oops! No notes selected!');
		}
	};

	resetCode = () => {
		this.setState({
			codes: null
		});
	};

	resetNote = () => {
		this.setState({
			codes: null,
			noteId: null,
			noteTitle: null
		});
	};

	// getCodeTemplate = (noteid) => {
	// 	this.setState({
	// 		noteId: noteid
	// 	});
	// };

	getNoteContent = (value) => {
		this.setState({
			noteValue: value
		});
	};

	render() {
		return (
			<React.Fragment>
				<div className="navbar navbar--app">
					<Link to="/">
						<img className="applogo" alt="logo" src="devNote--3.png" />
					</Link>
					<Link onClick={this.handleClick} className="navLogIn navStart navStart--logout">
						log out
					</Link>
				</div>
				<div className="main-page">
					<UserNav
						currentUser={this.props.currentUser}
						getNoteId={this.getNoteId}
						getNoteTitle={this.getNoteTitle}
						notes={this.props.notes}
						getCodeSnippet={this.getCodeSnippet}
						getCurrentUser={this.props.getCurrentUser}
					/>
					<div className="code-and-note">
						<Note
							resetNote={this.resetNote}
							addNewNote={this.props.addNewNote}
							currentUser={this.props.currentUser}
							currentUserId={this.props.currentUserId}
							deleteNote={this.props.deleteNote}
							getCodeSnippet={this.getCodeSnippet}
							// getCodeTemplate={this.getCodeTemplate}
							notes={this.props.notes}
							noteId={this.state.noteId}
							noteTitle={this.state.noteTitle}
							updateNote={this.props.updateNote}
							callit={this.callit}
							getNoteContent={this.getNoteContent}
						/>
						<Code
							codes={this.state.codes}
							getCodeSnippet={this.getCodeSnippet}
							noteId={this.state.noteId}
							noteValue={this.state.noteValue}
							resetCode={this.resetCode}
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

// export default connect()(Main)
