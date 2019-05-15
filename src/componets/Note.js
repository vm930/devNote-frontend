import React, { Component } from 'react';
import NoteOption from './NoteOption';
import NoteTitle from './NoteTitle';
import NoteEditor from './NoteEditor';

class Note extends Component {
	render() {
		return (
			<React.Fragment>
				<NoteTitle />
				<NoteEditor />
				<NoteOption />
			</React.Fragment>
		);
	}
}

export default Note;
