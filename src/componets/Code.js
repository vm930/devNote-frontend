import React, { Component } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AceEditor from 'react-ace';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import Icon from 'react-icons-kit';

import { floppyDisk } from 'react-icons-kit/icomoon/floppyDisk';
import { fileEmpty } from 'react-icons-kit/icomoon/fileEmpty';
import { folderMinus } from 'react-icons-kit/icomoon/folderMinus';
import { download2 } from 'react-icons-kit/icomoon/download2';
import { globe } from 'react-icons-kit/entypo/globe';
import { paintBrush } from 'react-icons-kit/fa/paintBrush';

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

class Code extends Component {
	state = {
		value: '',
		mode: 'javascript',
		theme: 'xcode',
		currentCodeTitle: '',
		currentCodeId: null
	};

	autoSaver = debounce(() => {
		this.performSave();
	}, 5000);

	notifySave = () => toast('auto saved!', { containerId: 'S' });
	notifyDelete = () => toast('code deleted!', { containerId: 'D' });
	notifyCreate = () => toast('code created!', { containerId: 'C' });
	notifyDownload = () => toast('please create code to download!', { containerId: 'E' });

	handleChange = (value) => {
		this.setState({ value }, () => {
			this.autoSaver();
		});
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
		this.setState({
			value: foundCode.code_value,
			mode: foundCode.mode,
			theme: foundCode.style,
			currentCodeTitle: foundCode.title,
			currentCodeId: foundCode.id
		});
	};

	performSave = () => {
		if (this.state.value !== '') {
			if (this.state.currentCodeId === null) {
				this.createCode(this.state.value);
				this.notifyCreate();
			}
			if (this.state.currentCodeId) {
				this.updateCode(this.selectCodeTitle.value, this.state.currentCodeTitle);
			}
		}
	};

	//create code
	createCode = () => {
		const newCode = {
			code_value: this.state.value,
			mode: this.state.mode,
			style: this.state.theme,
			title: this.state.currentCodeTitle
		};
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
							.then((code) => {
								this.props.getCodeSnippet(this.props.noteId);
							})
				);
			});
	};

	//update codes
	updateCode = (value, title) => {
		if (this.state.currentCodeId) {
			// console.log(this.state.currentCodeId)
			fetch(`${URL}/codes/${this.state.currentCodeId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json', Accepts: 'application/json' },
				body: JSON.stringify({
					id: this.state.currentCodeId,
					code_value: this.state.value,
					mode: this.state.mode,
					style: this.state.theme,
					title: this.state.currentCodeTitle
				})
			})
				.then((response) => response.json())
				.then((code) => {
					this.props.getCodeSnippet(this.props.noteId);
					this.notifySave();
				});
		}
	};
	//delete codes
	deleteCode = (codeid) => {
		if (this.state.currentCodeId) {
			fetch(`${URL}/codes/${codeid}`, {
				method: 'DELETE'
			})
				.then((response) => response.json())
				.then((code) => {
					this.props.getCodeSnippet(this.props.noteId);
					this.notifyDelete();
					this.setState({
						value: '',
						mode: 'javascript',
						theme: 'xcode',
						currentCodeTitle: 'untitle',
						currentCodeId: null
					});
				});
		} else alert('oops! no code to select!');
	};

	export = () => {
		if (this.state.currentCodeId) {
			const element = document.createElement('a');
			const file = new Blob([ 'notes:\n', this.props.noteValue, '\ncode blocks:\n', this.state.value ], {
				type: 'text/plain'
			});
			element.href = window.URL.createObjectURL(file);
			element.download = `${this.state.currentCodeTitle}.txt`;
			document.body.appendChild(element);
			element.click();
		} else {
			this.notifyDownload();
		}
	};

	addCode = () => {
		this.props.resetCode();
		this.setState({
			value: '',
			mode: 'javascript',
			theme: 'xcode',
			currentCodeTitle: '',
			currentCodeId: null
		});
	};

	render() {
		return (
			<div>
				{this.props.codes ? (
					<div>
						<select className="dropdown-container" onChange={this.selectCodeTitle}>
							{this.props.codes.map((code) => {
								return (
									<option key={code.id} value={code.id}>
										{code.title}
									</option>
								);
							})}
						</select>
					</div>
				) : (
					<div className="progress indeterminate" />
				)}
				<React.Fragment>
					<ToastContainer enableMultiContainer containerId={'E'} transition={Bounce} autoClose={1000} />
					<div className="dropdown-container">
						<Icon
							className="setting"
							onClick={this.export}
							data-tip="export as txt file"
							icon={download2}
						/>
						<div className="dropdown">
							<Icon className="icon" icon={globe} />
							<Dropdown
								options={LANGUAGES}
								onChange={this.handleSelect}
								placeholder="Select a language"
								value={this.state.mode}
							/>
						</div>
						<div className="dropdown">
							<Icon className="icon" icon={paintBrush} />
							<Dropdown
								className="dropdown"
								options={THEME}
								onChange={this.handleTheme}
								placeholder="Select a theme"
								value={this.state.theme}
							/>
						</div>
					</div>
					{/* <button onClick={() => console.log(this.state.value)}>Log the text</button> */}
					<input
						className="code-title"
						onChange={this.handleCodeTitle}
						type="text"
						value={this.state.currentCodeTitle}
						placeholder="untitle"
					/>
					<AceEditor
						className="code-editor"
						placeholder="Write some code here..."
						mode={this.state.mode}
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

					<Icon className="setting" icon={floppyDisk} data-tip="save" onClick={() => this.performSave} />
					<Icon className="setting" data-tip="New code snippet" icon={fileEmpty} onClick={this.addCode} />
					<Icon
						className="setting"
						icon={folderMinus}
						data-tip="delete"
						onClick={() => this.deleteCode(this.state.currentCodeId)}
					/>
					<ToastContainer enableMultiContainer containerId={'S'} transition={Bounce} autoClose={1000} />
					<ToastContainer enableMultiContainer containerId={'C'} transition={Bounce} autoClose={1000} />
					<ToastContainer enableMultiContainer containerId={'D'} transition={Bounce} autoClose={1000} />
				</React.Fragment>
			</div>
		);
	}
}

export default Code;
