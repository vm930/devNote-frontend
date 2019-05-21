import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter } from 'react-router-dom';

//import components for main page
import Main from './componets/Main';
import LogIn from './componets/LogIn';
import CreateUser from './componets/CreateUser';

class App extends Component {
	state = {
		currentUser: null,
		currentUserId: null
	};

	componentDidMount() {
		//if local storage has userid then continue
		const token = localStorage.getItem('userId');
		if (token) {
			fetch(`http://localhost:3000/users/${token}`).then((res) => res.json()).then((json) => {
				this.setState({
					currentUser: json,
					currentUserId: json.id
				});
			});
		} else {
			console.log('im here');
			// this.props.history.push('/login');
		}
	}

	logout = () => {
		localStorage.clear();
		this.setState({
			currentUser: null,
			currentUserId: null
		});
		this.props.history.push('/login');
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
				localStorage.setItem('userId', json.id);
				this.setState({
					currentUser: json,
					currentUserId: json.id
				});
			});
	};

	render() {
		return (
			<Switch>
				<Route path="/login" render={(props) => <LogIn getUser={this.getUser} {...props} />} />
				<Route path="/signup" render={(props) => <CreateUser {...props} />} />
				<Route
					path="/"
					render={(props) => <Main {...props} logout={this.logout} currentUser={this.state.currentUser} />}
				/>
			</Switch>
		);
	}
}

export default withRouter(App);
