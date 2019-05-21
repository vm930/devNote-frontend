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
		notes: null
	};

	componentDidMount() {
		//if local storage has userid then continue
		const token = localStorage.getItem('userId');
		if (token) {
			fetch(`http://localhost:3000/users/${token}`).then((res) => res.json()).then((json) => {
				this.setState({
					currentUser: json,
					currentUserId: json.id,
					notes: json.notes
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
			currentUserId: null,
			notes: null
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
					currentUserId: json.id,
					notes: json.notes
				});
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

	deleteNote = (deleteNote) => {
		console.log('delete me ');
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
