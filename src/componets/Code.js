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

const URL = 'http://localhost:3000';

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
		value: '',
		mode: 'javascript',
		theme: 'xcode',
		currentCodeTitle: 'untitle',
		currentCodeId: null
	};

	handleChange = (value) => {
		this.setState({ value });
	};

	handleSelect = (e) => {
		this.setState({
			mode: e.value
		});
	};

	handleTheme = (e) => {
		this.setState({
			theme: e.value
		});
	};

	handleCodeTitle = (e) => {
		this.setState({
			currentCodeTitle: e.target.value
		});
	};

	selectCodeTitle = (e) => {
		const foundCode = this.props.codes.find((code) => {
			return code.id === parseInt(e.target.value);
		});
		this.setState(
			{
				value: foundCode.code_value,
				mode: foundCode.mode,
				theme: foundCode.style,
				currentCodeTitle: foundCode.title
			},
			() => {
				console.log(this.state);
			}
		);
	};

	// codes = { this.props.codes }
	//create code

	createCode = () => {
		const newCode = {
			code_value: this.state.value,
			mode: this.state.mode,
			style: this.state.theme,
			title: this.state.currentCodeTitle
		};

		// console.log(newCode);
		fetch(`${URL}/codes`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', Accepts: 'application/json' },
			body: JSON.stringify(newCode)
		})
			.then((response) => response.json())
			.then((code) => {
				this.setState(
					{
						currentCodeId: code.id
					},
					() =>
						fetch(`${URL}/note_codes`, {
							method: 'POST',
							headers: { 'Content-Type': 'application/json', Accepts: 'application/json' },
							body: JSON.stringify({
								note_id: this.props.noteId,
								code_id: this.state.currentCodeId
							})
						})
							.then((response) => response.json())
							.then((code) => console.log(code))
				);
			});
	};

	render() {
		return (
			<div>
				{this.props.codes ? (
					<React.Fragment>
						<select className="dropdown-trigger btn white" onChange={this.selectCodeTitle}>
							{this.props.codes.map((code) => {
								return (
									<option key={code.id} value={code.id}>
										{code.title}
									</option>
								);
							})}
						</select>
					</React.Fragment>
				) : (
					<div>No Codes</div>
				)}
				<React.Fragment>
					<Dropdown
						options={LANGUAGES}
						onChange={this.handleSelect}
						placeholder="Select a language"
						value={this.state.mode}
					/>
					<Dropdown
						options={THEME}
						onChange={this.handleTheme}
						placeholder="Select a theme"
						value={this.state.theme}
					/>
					{/* <button onClick={() => console.log(this.state.value)}>Log the text</button> */}
					<button onClick={() => this.createCode(this.state.value)}>add code</button>
					<button>update code</button>
					<button>delete code</button>

					<input
						className="code-title"
						onChange={this.handleCodeTitle}
						type="text"
						value={this.state.currentCodeTitle}
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
				</React.Fragment>
			</div>
		);
	}
}

export default Code;
