import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

//import components for main page
import Main from './componets/Main';
import LogIn from './componets/LogIn';

class App extends Component {
	state = {
		currentUser: null
	};

	getUser = (username) => {
		fetch('http://localhost:3000/login/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user: { user_name: username }
			})
		})
			.then((res) => res.json())
			.then((json) => {
				console.log('json', json);
				localStorage.setItem('userId', json.id);
				// this.setState({
				// 	currentUser: json
				// });
			});
	};

	render() {
		return (
			<Switch>
				<Route path="/login" render={(props) => <LogIn getUser={this.getUser} {...props} />} />
				<Route path="/" render={(props) => <Main currentUser={this.state.currentUser} {...props} />} />
			</Switch>
		);
	}
}

export default App;
