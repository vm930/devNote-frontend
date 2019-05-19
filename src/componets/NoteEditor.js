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
		value: initialValue
	};

	handleSubmit = (e) => {
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
			console.log(JSON.parse(json.note_value));
			if (JSON.parse(json.note_value)) {
				const existingValue = Value.fromJSON(JSON.parse(json.note_value));
				// console.log(existingValue);
				this.setState(
					{
						value: existingValue
					},
					() => console.log('data from database', this.state.value)
				);
			} else {
				this.setState({
					value: initialValue
				});
			}
		});
	};

	handleClick = (e) => {
		this.getNote(61);
		// this.saveNote()
	};

	saveClick = (e) => {
		if (initialValue !== Value.fromJSON(this.state.value.document)) {
			const content = JSON.stringify(this.state.value.toJSON());
			this.saveNote(61, content);
		}
	};

	handleDelete = (noteId) => {
		this.deleteNote(40);
	};

	//create note
	createNote = (noteContent) => {
		fetch('http://localhost:3000/notes', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accepts: 'application/json' },
			body: JSON.stringify({
				note: {
					user_id: 29,
					note_value: noteContent
				}
			})
		})
			.then((response) => response.json())
			.then((json) => {
				console.log('after create note', json);
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
					// user_id: 29,
					note_value: noteContent
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
				<button onClick={this.handleSubmit}>create</button>
				<button onClick={this.handleClick}>get notes back from database</button>
				<button onClick={this.saveClick}>update database</button>
				<button onClick={this.handleDelete}>Delete Note</button>
				{/* </form> */}
			</React.Fragment>
		);
	}
}

export default NoteEditor;
