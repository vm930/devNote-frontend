import React, { Component } from 'react';
import NoteOption from './NoteOption';
import NoteTitle from './NoteTitle';
import NoteEditor from './NoteEditor';

class Note extends Component {
	render() {
		return (
			<React.Fragment>
				<NoteTitle noteId={this.props.noteId} />
				<NoteEditor noteId={this.props.noteId} currentUser={this.props.currentUser} />
				<NoteOption noteId={this.props.noteId} />
			</React.Fragment>
		);
	}
}

export default Note;
