import React, { Component } from 'react';
import './App.css';

//import components for main page
import Main from './componets/Main';
import LogIn from './componets/LogIn';

function App() {
	return (
		<React.Fragment>
			<LogIn />
			<Main />
		</React.Fragment>
	);
}

export default App;
