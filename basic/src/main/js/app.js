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
    
	constructor(props) {
		super(props);
		this.state = {name: '', mail: '', pass: ''};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeMail = this.handleChangeMail.bind(this);
		this.handleChangePass = this.handleChangePass.bind(this);
	}

	handleChangeName(event) {
		let {value} = event.target;
		this.setState({name: value});
	}
	handleChangeMail(event) {
		let {value} = event.target;
		this.setState({mail: value});
	}
	handleChangePass(event) {
		let {value} = event.target;
		this.setState({pass: value});
	}
	
	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.name + "\nA mail: " + this.state.mail + "\nAnd a password: " + this.state.pass);
		event.preventDefault();
	}
/*
	loggedIn(){
		alert('A name was submitted: ' + this.state.inputName);
	}
*/
	registered() {
		alert('You are now registered!');
	}
    
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Username:
						<input type="text" value={this.state.name} placeholder="Enter Username"
						 onChange={event => this.handleChangeName(event)} />
					</label>
					<br></br>
					<label>
						Email:
						<input type="text" value={this.state.mail} placeholder="Enter Email"
						 onChange={event => this.handleChangeMail(event)} />
					</label>
					<br></br>
					<label>
						Password:
						<input type="text" value={this.state.pass} placeholder="Enter Password"
						 onChange={event => this.handleChangePass(event)} />
					</label>
					<br></br>
					<input type="submit" value="Login" />
				</form>

				<button onClick={this.registered}>
  				REGISTER
				</button>
			</div>
		)
	}
}

class CreateDialog extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		const newUser = {};
		this.props.attributes.forEach(attribute => {
			newUser[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
		});
		this.props.onCreate(newUser);

		// clear out the dialog's inputs
		this.props.attributes.forEach(attribute => {
			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
		});

		// Navigate away from the dialog to hide it.
		window.location = "#";
	}

	render() {
		return (
			<div>
				<a href="#createUser">Create</a>

				<div id="createUser" className="modalDialog">
					<div>
						<a href="#" title="Close" className="close">X</a>

						<h2>Create new User</h2>

						<form>
							{inputs}
							<button onClick={this.handleSubmit}>logging In</button>
						</form>
					</div>
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
