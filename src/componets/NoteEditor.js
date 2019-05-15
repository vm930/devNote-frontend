import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

//import styling components into NoteEditor
import BoldMark from './BoldMark';
import ItalicMark from './ItalicMark';
import Icon from 'react-icons-kit';

//styling functionalities into NoteEditor
import { FormatToolbar } from './index';
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
