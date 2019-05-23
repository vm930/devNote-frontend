import React, { Component } from 'react';
import AceEditor from 'react-ace';
//adding options to code eidtior
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/xcode';

class Code extends Component {
	state = {
		value: 'Write some code here...'
		// language: 'javascript',
		// theme: 'xcode'
	};

	handleChange = (value) => {
		this.setState({ value });
	};

	render() {
		return (
			<div className="code-editor">
				<button onClick={() => console.log(this.state.value)}>Log the text</button>
				<AceEditor
					placeholder="Write some code here..."
					mode={this.state.language}
					theme="this.state.theme"
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
