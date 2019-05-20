import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Icon from 'react-icons-kit';

//import styling components into NoteEditor
import BoldMark from '../containers/BoldMark';
import ItalicMark from '../containers/ItalicMark';
import FormatToolbar from '../containers/FormatToolbar';

//import tools components into NoteEditor toolBars
import { italic } from 'react-icons-kit/fa/italic';
import { bold } from 'react-icons-kit/fa/bold';
import { tsThisType } from '@babel/types';

const initialValue = Value.fromJSON({
	document: {
		nodes: [
			{
				object: 'block',
				type: 'paragraph',
				nodes: [
					{
						object: 'text',
						leaves: [
							{
								text: 'Write Your Notes Here'
							}
						]
					}
				]
			}
		]
	}
});

class NoteEditor extends Component {
	state = {
		value: initialValue,
		currentUserId: parseInt(localStorage.getItem('userId')),
		currentNoteId: null
	};

	createClick = (e) => {
		e.preventDefault();
		if (initialValue !== Value.fromJSON(this.state.value.document)) {
			const content = JSON.stringify(this.state.value.toJSON());
			this.createNote(content);
		}
	};

	handleOnChange = ({ value }) => {
		// if (initialValue !== Value.fromJSON(this.state.value.document)) {
		// 	const content = JSON.stringify(this.state.value.toJSON());
		// 	this.saveNote(58, content);
		// }
		this.setState({ value });
	};

	//Read exiting notes  -- base off which user is logging in from their userId

	getNote = (noteId) => {
		fetch('http://localhost:3000/notes/' + `${noteId}`).then((response) => response.json()).then((json) => {
			if (JSON.parse(json.note_value)) {
				const existingValue = Value.fromJSON(JSON.parse(json.note_value));
				this.setState(
					{
						value: existingValue,
						currentNoteId: noteId
					}
					// () => console.log('data from database', this.state.value)
				);
			} else {
				this.setState({
					value: initialValue
				});
			}
		});
	};

	// getCurrentNoteId = () => {
	// 	fetch(`http://localhost:3000/users/${this.state.currentUserId}`).then((res) => res.json()).then((json) => {
	// 		const noteId = json.notes[0].id;
	// 		this.setState({
	// 			currentNoteId: noteId
	// 		});
	// 	});
	// };

	// getNoteClick = (e) => {
	// 	e.preventDefault();
	// 	// this.getCurrentNoteId();
	// 	// this.getNote(this.state.currentNoteId);
	// 	this.getNote(94);
	// };

	saveClick = (e) => {
		if (initialValue !== Value.fromJSON(this.state.value.document)) {
			const content = JSON.stringify(this.state.value.toJSON());
			this.saveNote(this.state.currentUserId, content);
		}
	};

	handleDelete = (noteId) => {
		this.deleteNote(this.state.currentUserId);
	};

	//create note
	createNote = (noteContent) => {
		fetch('http://localhost:3000/notes', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accepts: 'application/json' },
			body: JSON.stringify({
				note: {
					user_id: this.state.currentUserId,
					note_value: noteContent
				}
			})
		})
			.then((response) => response.json())
			.then((note) => {
				console.log('after create note', note);
				this.setState({
					currentNoteId: note.id
				});
			});
	};

	//update notes
	saveNote = (noteId, noteContent) => {
		// console.log('note ID ', noteId);
		fetch(`http://localhost:3000/notes/${noteId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', Accepts: 'application/json' },
			body: JSON.stringify({
				note: {
					id: noteId,
					note_value: noteContent
					// user: {
					// 	id: this.currentUserId
					// }
				}
			})
		})
			.then((response) => response.json())
			.then((json) => {
				console.log('saved note', json);
			});
	};

	//delete notes

	deleteNote = (noteId) => {
		fetch(`http://localhost:3000/notes/${noteId}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json', Accepts: 'application/json' }
			// body: JSON.stringify({
			// 	note: {
			// 		id: noteId
			// 		// // user_id: 29,
			// 		// note_value: noteContent
			// 	}
		});
		this.setState({
			value: initialValue
		});
	};

	onKeyDown = (e, change, next) => {
		if (!e.ctrlKey) {
			return next();
		}

		e.preventDefault();
		switch (e.key) {
			case 'b': {
				change.toggleMark('bold');
				return true;
			}
			case 'i': {
				change.toggleMark('italic');
				return true;
			}
			default: {
				return;
			}
		}
	};

	renderMark = (props) => {
		switch (props.mark.type) {
			case 'bold':
				return <BoldMark {...props} />;
			case 'italic':
				return <ItalicMark {...props} />;
		}
	};

	styleClick = (e, type) => {
		e.preventDefault();
		this.editor.toggleMark(type);
	};

	ref = (editor) => {
		this.editor = editor;
	};

	render() {
		// console.log('currentUserid: ', this.state.currentUserId);
		// console.log('current noteid', this.props.noteId);
		if (this.props.noteId && this.props.noteId !== this.state.currentNote) {
			this.getNote(this.props.noteId);
		}
		return (
			<React.Fragment>
				<FormatToolbar className="format-toolbar">
					<button className="tooltip-icon-button" onClick={(e) => this.styleClick(e, 'bold')}>
						<Icon icon={bold} />
					</button>
					<button className="tooltip-icon-button" onClick={(e) => this.styleClick(e, 'italic')}>
						<Icon icon={italic} />
					</button>
				</FormatToolbar>
				{/* <form onSubmit={this.handleSubmit}> */}
				<Editor
					className="note-editor"
					ref={this.ref}
					value={this.state.value}
					onChange={this.handleOnChange}
					onKeyDown={this.onKeyDown}
					renderMark={this.renderMark}
				/>
				{/* <input type="submit" value="create" /> */}
				<button onClick={this.createClick}>create</button>
				{/* <button onClick={this.getNoteClick}>get notes back from database</button> */}
				<button onClick={this.saveClick}>update database</button>
				<button onClick={this.handleDelete}>Delete Note</button>
				{/* </form> */}
			</React.Fragment>
		);
	}
}

export default NoteEditor;
