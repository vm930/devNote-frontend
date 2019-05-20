import React, { Component } from 'react';
import NoteOption from './NoteOption';

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
				<NoteOption noteId={this.props.noteId} />
			</React.Fragment>
		);
	}
}

export default Note;
