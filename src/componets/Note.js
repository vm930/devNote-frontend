import React, { Component } from 'react';
import NoteEditor from './NoteEditor';

class Note extends Component {
	render() {
		return (
			<div>
				<NoteEditor
					noteId={this.props.noteId}
					currentUser={this.props.currentUser}
					noteTitle={this.props.noteTitle}
					addNewNote={this.props.addNewNote}
					updateNote={this.props.updateNote}
					deleteNote={this.props.deleteNote}
				/>
			</div>
		);
	}
}

export default Note;
