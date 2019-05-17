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
								text: 'My 1st paragraph wahaha!'
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
		// console.log(this.state.value.toJSON());
		// console.log(value.document);
		// console.log({ value });
		if (initialValue !== Value.fromJSON(this.state.value.document)) {
			const content = JSON.stringify(this.state.value.toJSON());
			this.createNote(content);
		}
	};

	handleOnChange = ({ value }) => {
		this.setState({ value });
		// console.log(value.document);
	};

	createNote = (noteContent) => {
		fetch('http://localhost:3000/notes', {
			method: 'post',
			headers: { 'Content-Type': 'application/json', Accepts: 'application/json' },
			body: JSON.stringify({
				// title: 'testing title',
				// date: 'today',
				note: {
					user_id: 28,
					note_value: noteContent
				}
			})
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
			});
	};

	getNote = (noteId) => {
		fetch('http://localhost:3000/notes/' + `${noteId}`).then((response) => response.json()).then((json) => {
			console.log(JSON.parse(json.note_value));
			const existingValue = Value.fromJSON(JSON.parse(json.note_value));
			console.log(existingValue);
			this.setState(
				{
					value: existingValue
				},
				() => console.log(this.state.value)
			);
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

	click = (e, type) => {
		e.preventDefault();
		this.editor.toggleMark(type);
	};

	ref = (editor) => {
		this.editor = editor;
	};

	handleClick = (e) => {
		// console.log('im clicked');
		this.getNote(55);
	};

	render() {
		return (
			<React.Fragment>
				<FormatToolbar className="format-toolbar">
					<button className="tooltip-icon-button" onClick={(e) => this.click(e, 'bold')}>
						<Icon icon={bold} />
					</button>
					<button className="tooltip-icon-button" onClick={(e) => this.click(e, 'italic')}>
						<Icon icon={italic} />
					</button>
				</FormatToolbar>
				<form onSubmit={this.handleSubmit}>
					<Editor
						className="note-editor"
						ref={this.ref}
						value={this.state.value}
						onChange={this.handleOnChange}
						onKeyDown={this.onKeyDown}
						renderMark={this.renderMark}
					/>
					<input type="submit" value="submit data to server" />
					<button onClick={this.handleClick}>get notes back from database</button>
				</form>
			</React.Fragment>
		);
	}
}

export default NoteEditor;
