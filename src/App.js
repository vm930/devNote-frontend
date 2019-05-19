import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

//import components for main page
import Main from './componets/Main';
import LogIn from './componets/LogIn';

class App extends Component {
	state = {
		user: null
	};

	getUser = (userInput) => {
		// console.log(userInput);
		fetch('http://localhost:3000/users/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user: { name: userInput }
			})
		})
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					user: json
				});
			});
	};

	render() {
		return (
			<Switch>
				<Route path="/login" render={(props) => <LogIn getUser={this.getUser} {...props} />} />
				<Route path="/" render={(props) => <Main currentUser={this.state.user} {...props} />} />
			</Switch>
		);
	}
}

export default App;
