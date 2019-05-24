import React, { Component } from 'react';
import AceEditor from 'react-ace';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

//adding options to code eidtior
import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/xml';
import 'brace/mode/sass';

import 'brace/mode/markdown';
import 'brace/mode/json';
import 'brace/mode/mysql';
import 'brace/mode/html';
import 'brace/mode/ruby';
import 'brace/mode/handlebars';

import 'brace/mode/csharp';
import 'brace/mode/golang';
import 'brace/mode/coffee';
import 'brace/mode/css';

import 'brace/theme/monokai';
import 'brace/theme/xcode';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/solarized_dark';

const LANGUAGES = [
	'javascript',
	'java',
	'python',
	'xml',
	'ruby',
	'sass',
	'markdown',
	'mysql',
	'json',
	'html',
	'handlebars',
	'golang',
	'csharp',
	'coffee',
	'css'
];

const THEME = [ 'monokai', 'github', 'xcode', 'tomorrow', 'solarized_dark' ];

class Code extends Component {
	state = {
		value: '//Write some code here...',
		language: 'javascript',
		theme: 'xcode',
		currentCodeTitle: ''
	};

	handleChange = (value) => {
		this.setState({ value });
	};

	handleSelect = (e) => {
		this.setState({
			language: e.value
		});
	};

	handleTheme = (e) => {
		this.setState({
			theme: e.value
		});
	};
	render() {
		return (
			<div>
				<Dropdown
					options={LANGUAGES}
					onChange={this.handleSelect}
					placeholder="Select a language"
					value={this.state.language}
				/>

				<Dropdown
					options={THEME}
					onChange={this.handleTheme}
					placeholder="Select a theme"
					value={this.state.theme}
				/>

				<button onClick={() => console.log(this.state.value)}>Log the text</button>

				<button>add code</button>
				<button>update code</button>
				<button>delete code</button>
				<input
					className="code-title"
					onChange={this.handleCodeTitle}
					type="text"
					value={this.state.currentNoteTitle}
					placeholder="Title"
				/>
				<AceEditor
					className="code-editor"
					placeholder="Write some code here..."
					mode={this.state.language}
					theme={this.state.theme}
					name="blah2"
					onChange={this.handleChange}
					fontSize={14}
					showPrintMargin={true}
					showGutter={true}
					highlightActiveLine={true}
					value={this.state.value}
					setOptions={{
						enableBasicAutocompletion: false,
						enableLiveAutocompletion: false,
						enableSnippets: false,
						showLineNumbers: true,
						tabSize: 2
					}}
					editorProps={{
						$blockScrolling: Infinity
					}}
				/>
			</div>
		);
	}
}

export default Code;
