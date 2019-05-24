import React, { Component } from 'react';
import NoteEditor from './NoteEditor';

class Note extends Component {
	render() {
		return (
			<div>
				{/* <Dropdown
					options={notes.codes}
					onChange={this.selectCode}
					placeholder="Code Snippets"
					value={this.state.notes}
				/> */}
				<NoteEditor
					addNewNote={this.props.addNewNote}
					currentUser={this.props.currentUser}
					currentUserId={this.props.currentUserId}
					deleteNote={this.props.deleteNote}
					getCodeSnippet={this.props.getCodeSnippet}
					noteTitle={this.props.noteTitle}
					noteId={this.props.noteId}
					updateNote={this.props.updateNote}
				/>
			</div>
		);
	}
}

export default Note;
