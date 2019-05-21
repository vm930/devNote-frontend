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

	handleClick = () => {
		this.props.logout();
	};

	render() {
		return (
			<React.Fragment>
				<button onClick={this.handleClick}>Log Out</button>
				<UserNav getNoteId={this.getNoteId} getNoteTitle={this.getNoteTitle} />
				<Note noteId={this.state.noteId} noteTitle={this.state.noteTitle} />
				<Code />
			</React.Fragment>
		);
	}
}

// export default connect()(Main);
