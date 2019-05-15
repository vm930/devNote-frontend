import React, { Component } from 'react';

import Code from './Code';
import Note from './Note';
import UserNotes from './UserNotes';

class Main extends Component {
	render() {
		return (
			<React.Fragment>
				<UserNotes />
				<Note />
				<Code />
			</React.Fragment>
		);
	}
}

export default Main;
