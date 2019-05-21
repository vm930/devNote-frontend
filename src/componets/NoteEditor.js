import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Icon from 'react-icons-kit';

//import styling components into NoteEditor
import BoldMark from '../containers/BoldMark';
import ItalicMark from '../containers/ItalicMark';
import Underline from '../containers/Underlne';
import Code from '../containers/Code';
import List from '../containers/List';
// import Link from '../containers/Link';
import FormatToolbar from '../containers/FormatToolbar';

//import tools components into NoteEditor toolBars
import { italic } from 'react-icons-kit/fa/italic';
import { bold } from 'react-icons-kit/fa/bold';
import { code } from 'react-icons-kit/fa/code';
import { list } from 'react-icons-kit/fa/list';
import { underline } from 'react-icons-kit/fa/underline';
// import { link } from 'react-icons-kit/fa/link';

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

const debounce = (fn, delay) => {
	let timer = null;
	return function(...args) {
		const context = this;
		timer && clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(context, args);
		}, delay);
	};
};

class NoteEditor extends Component {
	state = {
		value: initialValue,
		currentUserId: parseInt(localStorage.getItem('userId')),
		currentNoteId: null,
		currentNoteTitle: ''
	};

	autoSaver = debounce(() => {
		this.performSave();
	}, 3000);

	handleOnChange = ({ value }) => {
		this.setState({ value }, () => {
			this.autoSaver();
		});
	};

	//Read exiting notes  -- base off which user is logging in from their userId

	getNote = (noteId) => {
		fetch('http://localhost:3000/notes/' + `${noteId}`).then((response) => response.json()).then((json) => {
			if (JSON.parse(json.note_value)) {
				const existingValue = Value.fromJSON(JSON.parse(json.note_value));
				this.setState({
					value: existingValue,
					currentNoteId: noteId,
					currentNoteTitle: json.title
				});
			} else {
				this.setState({
					value: initialValue
				});
			}
		});
	};

	performSave = () => {
		if (initialValue !== this.state.value) {
			const content = JSON.stringify(this.state.value.toJSON());
			if (this.state.currentNoteId) {
				this.saveNote(this.state.currentNoteId, content, this.state.currentNoteTitle);
			} else {
				this.createNote(content, this.state.currentNoteTitle);
			}
		}
	};

	handleDelete = (noteId) => {
		this.deleteNote(this.state.currentUserId);
	};

	//create note
	createNote = (noteContent, title) => {
		fetch('http://localhost:3000/notes', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accepts: 'application/json' },
			body: JSON.stringify({
				note: {
					user_id: this.state.currentUserId,
					note_value: noteContent,
					title: title
				}
			})
		})
			.then((response) => response.json())
			.then((note) => {
				// console.log('create note', note);
				this.props.addNewNote(note);
				this.setState({
					currentNoteId: note.id
					// currentNoteTitle: note.title
				});
			});
	};

	// state = {
	// 	value: initialValue,
	// 	currentUserId: parseInt(localStorage.getItem('userId')),
	// 	currentNoteId: null,
	// 	currentNoteTitle: ''
	// };

	//update notes
	saveNote = (noteId, noteContent, title) => {
		fetch(`http://localhost:3000/notes/${noteId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json', Accepts: 'application/json' },
			body: JSON.stringify({
				note: {
					id: noteId,
					note_value: noteContent,
					title: title
				}
			})
		})
			.then((response) => response.json())
			.then((note) => {
				console.log('saved note', note);
				this.props.updateNote(note);
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
			case 'u': {
				change.toggleMark('underline');
				return true;
			}
			case 'l': {
				change.toggleMark('list');
				return true;
			}
			case 'c': {
				change.toggleMark('code');
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
			case 'underline':
				return <Underline {...props} />;
			case 'code':
				return <Code {...props} />;
			case 'list':
				return <List {...props} />;
			// case 'link':
			// 	return <Link {...props} />;
		}
	};

	styleClick = (e, type) => {
		e.preventDefault();
		this.editor.toggleMark(type);
	};

	ref = (editor) => {
		this.editor = editor;
	};

	handleTitle = (e) => {
		this.setState({
			currentNoteTitle: e.target.value
		});
	};

	render() {
		if (this.props.noteId && this.props.noteId !== this.state.currentNoteId) {
			this.getNote(this.props.noteId);
		}
		return (
			<React.Fragment>
				<input
					className="note-title"
					onChange={this.handleTitle}
					type="text"
					value={this.state.currentNoteTitle}
					placeholder="Write Title Here"
				/>
				<FormatToolbar className="format-toolbar">
					<button className="tooltip-icon-button" onClick={(e) => this.styleClick(e, 'bold')}>
						<Icon icon={bold} />
					</button>
					<button className="tooltip-icon-button" onClick={(e) => this.styleClick(e, 'italic')}>
						<Icon icon={italic} />
					</button>
					<button className="tooltip-icon-button" onClick={(e) => this.styleClick(e, 'underline')}>
						<Icon icon={underline} />
					</button>
					<button className="tooltip-icon-button" onClick={(e) => this.styleClick(e, 'list')}>
						<Icon icon={list} />
					</button>
					<button className="tooltip-icon-button" onClick={(e) => this.styleClick(e, 'code')}>
						<Icon icon={code} />
					</button>
					{/* <button className="tooltip-icon-button" onClick={(e) => this.styleClick(e, 'code')}>
						<Icon icon={link} />
					</button> */}
				</FormatToolbar>

				<Editor
					className="note-editor"
					ref={this.ref}
					value={this.state.value}
					onChange={this.handleOnChange}
					onKeyDown={this.onKeyDown}
					renderMark={this.renderMark}
				/>
				<button onClick={this.performSave}>save</button>
				<button onClick={this.handleDelete}>Delete Note</button>
				<button>Cancel</button>
			</React.Fragment>
		);
	}
}

export default NoteEditor;
