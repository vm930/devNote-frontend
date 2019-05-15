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

	onChange = ({ value }) => {
		if (value.document != this.state.value.document) {
			const content = JSON.stringify(value.toJSON());
			this.createNote(content);
		}
		this.setState({ value });
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

	render() {
		return (
			<React.Fragment>
				<FormatToolbar>
					<button className="tooltip-icon-button" onClick={(e) => this.click(e, 'bold')}>
						<Icon icon={bold} />
					</button>
					<button className="tooltip-icon-button" onClick={(e) => this.click(e, 'italic')}>
						<Icon icon={italic} />
					</button>
				</FormatToolbar>
				<Editor
					ref={this.ref}
					value={this.state.value}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
					renderMark={this.renderMark}
				/>
			</React.Fragment>
		);
	}
}

export default NoteEditor;
