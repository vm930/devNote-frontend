import React, { Component } from 'react';
// import { Connect } from 'react-redux';

import Code from './Code';
import Note from './Note';
import UserNav from './UserNav';

export default class Main extends Component {
	render() {
		return (
			<React.Fragment>
				<UserNav />
				<Note />
				<Code />
			</React.Fragment>
		);
	}
}

// export default connect()(Main);
