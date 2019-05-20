import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

//import components for main page
import Main from './componets/Main';
import LogIn from './componets/LogIn';
import CreateUser from './componets/CreateUser';

class App extends Component {
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
				localStorage.setItem('userId', json.id);
			});
	};

	render() {
		return (
			<Switch>
				<Route path="/login" render={(props) => <LogIn getUser={this.getUser} {...props} />} />
				<Route path="/signup" render={(props) => <CreateUser {...props} />} />
				<Route path="/" render={(props) => <Main {...props} />} />
			</Switch>
		);
	}
}

export default App;
