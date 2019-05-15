import React, { Component } from 'react';
import './App.css';

//import components for main page
import Main from './componets/Main';
import LogIn from './componets/LogIn';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<LogIn />
				<Main />
			</React.Fragment>
		);
	}
}

export default App;

// function App() {
// 	return (
// 		<React.Fragment>
// 			{/* <LogIn/> */}
// 			<Main />
// 			<BoldMark.js />
// 		</React.Fragment>
// 	);
// }

// export default App;
