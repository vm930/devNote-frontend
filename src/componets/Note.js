import React, { Component } from 'react';

import NoteEditor from './NoteEditor';

class Note extends Component {
	render() {
		return (
			<React.Fragment>
				<NoteEditor
					noteId={this.props.noteId}
					currentUser={this.props.currentUser}
					noteTitle={this.props.noteTitle}
				/>
			</React.Fragment>
		);
	}
}

export default Note;
