import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Icon from 'react-icons-kit';
import ReactTooltip from 'react-tooltip';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-dropdown/style.css';

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
import { google } from 'react-icons-kit/icomoon/google';
import { github } from 'react-icons-kit/icomoon/github';
import { floppyDisk } from 'react-icons-kit/icomoon/floppyDisk';
import { fileEmpty } from 'react-icons-kit/icomoon/fileEmpty';
import { folderMinus } from 'react-icons-kit/icomoon/folderMinus';
import { copy } from 'react-icons-kit/icomoon/copy';

// import { link } from 'react-icons-kit/fa/link';
import Plain from 'slate-plain-serializer';

const URL = 'https://dev-note-backend.herokuapp.com';
// const URL = 'http://localhost:3000';

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
								text: ''
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
		currentUserId: null,
		currentNoteId: null,
		currentNoteTitle: ''
	};

	autoSaver = debounce(() => {
		this.performSave();
	}, 5000);

	handleOnChange = ({ value }) => {
		this.setState({ value }, () => {
			this.autoSaver();
		});
	};

	//Read exiting notes  -- base off which user is logging in from their userId
	getNote = (noteId) => {
		fetch(`${URL}/notes/${noteId}`).then((response) => response.json()).then((json) => {
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
		// .catch(console.error);
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

	//delete note
	handleDelete = (noteId) => {
		this.props.deleteNote(this.state.currentNoteId);
		this.notifyDelete();
		this.setState({
			value: initialValue,
			currentNoteTitle: ''
		});
	};

	//create note
	createNote = (noteContent, title) => {
		fetch(`${URL}/notes`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accepts: 'application/json' },
			body: JSON.stringify({
				note: {
					user_id: this.props.currentUserId,
					note_value: noteContent,
					title: title
				}
			})
		})
			.then((response) => response.json())
			.then((note) => {
				this.notifyCreate();
				this.props.addNewNote(note);
				this.setState({
					currentNoteId: note.id
				});
			});
	};

	//update notes
	saveNote = (noteId, noteContent, title) => {
		fetch(`${URL}/notes/${noteId}`, {
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
				this.notifySave();
				this.props.updateNote(note);
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

	handleGithubClick = (e) => {
		window.open('https://github.com/', '_blank');
	};
	handleGoogleClick = () => {
		window.open('https://www.google.com/', '_blank');
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
			default: {
				return;
			}
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

	handleAddClick = () => {
		this.props.resetNote();
		this.setState({
			value: initialValue,
			currentNoteTitle: '',
			currentNoteId: null
		});
	};

	notifySave = () => toast('auto saved!', { containerId: 'S' });
	notifyDelete = () => toast('note deleted!', { containerId: 'D' });
	notifyCreate = () => toast('note created!', { containerId: 'C' });
	notifyExport = () => toast('added to export!', { containerId: 'A' });

	componentDidUpdate() {
		if (this.props.noteId) {
			if (this.props.noteId !== this.state.currentNoteId) {
				this.getNote(this.props.noteId);
			}
		}
	}

	handleCodeClick = () => {
		const value = Plain.serialize(this.state.value);
		//pass value back up to main
		this.props.getNoteContent(value);
		this.notifyExport();
	};

	render() {
		return (
			<div className="note-component">
				<input
					className="note-title"
					onChange={this.handleTitle}
					type="text"
					value={this.state.currentNoteTitle}
					placeholder="Write Title Here"
				/>
				<FormatToolbar className="format-toolbar">
					<ReactTooltip />
					<ToastContainer enableMultiContainer containerId={'A'} transition={Bounce} autoClose={1000} />
					<button className="tooltip-icon-button" data-tip="Bold" onClick={(e) => this.styleClick(e, 'bold')}>
						<Icon icon={bold} />
					</button>
					<button
						className="tooltip-icon-button"
						data-tip="Italic"
						onClick={(e) => this.styleClick(e, 'italic')}
					>
						<Icon icon={italic} />
					</button>
					<button
						className="tooltip-icon-button"
						data-tip="Underline"
						onClick={(e) => this.styleClick(e, 'underline')}
					>
						<Icon icon={underline} />
					</button>
					<button className="tooltip-icon-button" data-tip="List" onClick={(e) => this.styleClick(e, 'list')}>
						<Icon icon={list} />
					</button>
					<button
						className="tooltip-icon-button"
						data-tip="Code Block"
						onClick={(e) => this.styleClick(e, 'code')}
					>
						<Icon icon={code} />
					</button>

					<button
						className="tooltip-icon-button"
						data-tip="Take me to Google"
						onClick={this.handleGoogleClick}
					>
						<Icon icon={google} />
					</button>
					<button
						className="tooltip-icon-button"
						data-tip="Take me to GitHub"
						onClick={this.handleGithubClick}
					>
						<Icon icon={github} />
					</button>
					<button
						className="tooltip-icon-button"
						data-tip="add notes to code snippet to export"
						onClick={this.handleCodeClick}
					>
						<Icon icon={copy} />
					</button>

					{/* <button className="tooltip-icon-button" onClick={(e) => this.styleClick(e, 'code')}>
						<Icon icon={link} />
					</button> */}
				</FormatToolbar>
				{/* <button onClick={() => this.props.getCodeTemplate(this.state.currentNoteId)} className="code-btn">
					add code snippet
				</button> */}
				<Editor
					className="note-editor"
					ref={this.ref}
					value={this.state.value}
					onChange={this.handleOnChange}
					onKeyDown={this.onKeyDown}
					renderMark={this.renderMark}
				/>
				<div className="note-options">
					<Icon onClick={this.performSave} className="setting" icon={floppyDisk} data-tip="Save" />
					<Icon onClick={this.handleAddClick} data-tip="New Note" className="setting" icon={fileEmpty} />
					<Icon onClick={this.handleDelete} data-tip="Delete Note" className="setting" icon={folderMinus} />
					<ToastContainer enableMultiContainer containerId={'S'} transition={Bounce} autoClose={1000} />
					<ToastContainer enableMultiContainer containerId={'C'} transition={Bounce} autoClose={1000} />
					<ToastContainer enableMultiContainer containerId={'D'} transition={Bounce} autoClose={1000} />
				</div>
			</div>
		);
	}
}

export default NoteEditor;
