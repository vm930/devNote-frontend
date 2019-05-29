import React, { Component } from 'react';
import NoteEditor from './NoteEditor';

class Note extends Component {
	render() {
		return (
			<div>
				<NoteEditor
					addNewNote={this.props.addNewNote}
					currentUser={this.props.currentUser}
					currentUserId={this.props.currentUserId}
					deleteNote={this.props.deleteNote}
					resetNote={this.props.resetNote}
					// getCodeTemplate={this.props.getCodeTemplate}
					noteTitle={this.props.noteTitle}
					noteId={this.props.noteId}
					updateNote={this.props.updateNote}
					getNoteContent={this.props.getNoteContent}
				/>
			</div>
		);
	}
}

export default Note;
