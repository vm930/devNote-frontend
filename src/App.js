import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
//import components for main page
import Main from './componets/Main';
import LogIn from './componets/LogIn';
import CreateUser from './componets/CreateUser';

class App extends Component {
	state = {
		currentUser: null,
		currentUserId: null,
		notes: []
	};

	componentDidMount() {
		this.handleAuth();
	}

	componentWillUpdate() {
		// this.handleAuth();
	}

	handleAuth = () => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('id');
		if (token) {
			fetch(`http://localhost:3000/users/${userId}`).then((res) => res.json()).then((json) => {
				this.setState({
					currentUser: json,
					currentUserId: json.id,
					notes: json.notes
				});
				this.props.history.push('/');
			});
		} else {
			// console.log('im here');
			this.props.history.push('/login');
		}
	};

	logout = () => {
		localStorage.clear();
		this.setState({
			currentUser: null,
			currentUserId: null,
			notes: null
		});
		this.props.history.push('/login');
	};

	getUser = (username, password) => {
		fetch('http://localhost:3000/login/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user: {
					user_name: username,
					password_digest: password
				}
			})
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.errors) {
					console.log('errors');
				} else {
					console.log(json.user);
					if (json.user.id) {
						localStorage.setItem('token', json.jwt);
						localStorage.setItem('username', json.user.user_name);
						localStorage.setItem('id', json.user.id);

						this.setState({
							currentUser: json.user,
							currentUserId: json.user.id
						});
						this.handleAuth();
					}
				}
			});
	};

	addNewNote = (newNote) => {
		this.setState({
			notes: [ ...this.state.notes, newNote ]
		});
	};

	updateNote = (updateNote) => {
		const newNotes = this.state.notes.map((note) => {
			if (note.id === updateNote.id) {
				return updateNote;
			} else {
				return note;
			}
		});
		this.setState({
			notes: newNotes
		});
	};

	deleteNote = (deleteNoteId) => {
		//remove it from the front end
		const newNotes = this.state.notes.filter((note) => deleteNoteId !== note.id);
		this.setState({
			notes: newNotes
		});
		//update the backend

		fetch(`http://localhost:3000/notes/${deleteNoteId}`, {
			method: 'DELETE'
		});
	};

	render() {
		return (
			<Switch>
				<Route path="/login" render={(props) => <LogIn getUser={this.getUser} {...props} />} />
				<Route path="/signup" render={(props) => <CreateUser {...props} />} />
				<Route
					path="/"
					render={(props) => (
						<Main
							{...props}
							logout={this.logout}
							currentUser={this.state.currentUser}
							currentUserId={this.state.currentUserId}
							notes={this.state.notes}
							addNewNote={this.addNewNote}
							updateNote={this.updateNote}
							deleteNote={this.deleteNote}
						/>
					)}
				/>
			</Switch>
		);
	}
}

export default withRouter(App);
