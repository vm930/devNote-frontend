import React, { Component } from 'react';
import AceEditor from 'react-ace';
//adding options to code eidtior
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/xcode';

class Code extends Component {
	render() {
		return (
			<div className="code-editor">
				<AceEditor
					placeholder="what is this for?"
					mode="javascript"
					theme="xcode"
					name="blah2"
					// onChange={this.onChange}
					fontSize={14}
					showPrintMargin={true}
					showGutter={true}
					highlightActiveLine={true}
					value={`function biteMe(editor) {
  console.log("i've loaded");
}`}
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
