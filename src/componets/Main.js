import React, { Component } from 'react';
// import { Connect } from 'react-redux';

import Code from './Code';
import Note from './Note';
import UserNav from './UserNav';

export default class Main extends Component {
	state = {
		noteId: null
	};

	getNoteId = (noteId) => {
		this.setState({
			noteId: noteId
		});
	};
	render() {
		return (
			<React.Fragment>
				<UserNav getNoteId={this.getNoteId} />
				<Note noteId={this.state.noteId} />
				<Code />
			</React.Fragment>
		);
	}
}

// export default connect()(Main);
