'use strict';

// tag::vars[]
const React = require('react'); // <1>
const ReactDOM = require('react-dom'); // <2>
const client = require('./client'); // <3>
// end::vars[]

// tag::app[]
class App extends React.Component { // <1>

	constructor(props) {
		super(props);
		this.state = {users: []};
	}

	componentDidMount() { // <2>
		client({method: 'GET', path: '/api/users'}).done(response => {
			this.setState({users: response.entity._embedded.users});
		});
	}

	render() { // <3>
		return (
			<div>
				<UserList users={this.state.users}/>
				<Login/>
				<button onclick="login()">
  			LOGIN
				</button>
				<button onclick="register()">
  			REGISTER
				</button>
			</div>
		)
	}
}
// end::app[]

class User extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.user.username}</td>
				<td>{this.props.user.email}</td>
				<td>{this.props.user.password}</td>
			</tr>
		)
	}
}

class UserList extends React.Component{
	render() {
		const users = this.props.users.map(user =>
			<User key={user._links.self.href} user={user}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Description</th>
					</tr>
					{users}
				</tbody>
			</table>
		)
	}
}

class Login extends React.Component{
	render() {
		return (
			<div>
				<div>
				<label>Username:</label>
				<input/>
				</div>
				<div>
				<label>Email:</label>
				<input/>
				</div>
				<div>
				<label>Password:</label>
				<input/>
				</div>
			</div>
		)
	}
}

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]
