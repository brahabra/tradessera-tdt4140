import {Register} from './Register';
import {Login} from './Login';
import {UserList} from './UserList';
'use strict';

// tag::vars[]
const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
const client = require('./client'); // <3>
// end::vars[]

const follow = require('./follow');
const root = '/api';

// tag::app[]
class App extends React.Component { // <1>

	constructor(props) {
		super(props);
		this.state = {users: [], attributes: [], currentUser: null};
		this.onCreate = this.onCreate.bind(this);
		this.onLogin = this.onLogin.bind(this);
	}

	componentDidMount() { // <2>
		/*
		client({method: 'GET', path: '/api/users'}).done(response => {
			this.setState({users: response.entity._embedded.users});
		});
		*/
		this.loadFromServer();
	}

	loadFromServer() {
		follow(client, root, [
			{rel: 'users'}]
		).then(userCollection => {
			return client({
				method: 'GET',
				path: userCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return userCollection;
			});
		}).done(userCollection => {
			this.setState({
				users: userCollection.entity._embedded.users,
				attributes: Object.keys(this.schema.properties),
				links: userCollection.entity._links});
		});
	}

	onCreate(newUser) {
		const self = this;
		follow(client, root, ['users']).then(response => {
			return client({
				method: 'POST',
				path: response.entity._links.self.href,
				entity: newUser,
				headers: {'Content-Type': 'application/json'}
			})
		}).then(response => {
			return follow(client, root, [{rel: 'users'}]);
		}).done(response => {
			this.loadFromServer();
		});
	}

	onLogin(currentUser) {
		const self = this;
		this.state.currentUser = currentUser;
	}



	render() { // <3>
		return (
			<div>
				<UserList users={this.state.users}/>
				<Register attributes={this.state.attributes} currentUser={this.state.currentUser} onCreate={this.onCreate}/>
				<Login users={this.state.users} currentUser={this.state.currentUser} onLogin={this.onLogin}/>
			</div>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)

