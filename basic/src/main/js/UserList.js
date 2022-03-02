import React from 'react';

class UserList extends React.Component{
	render() {
		const users = this.props.users.map(user =>
			<User key={user._links.self.href} user={user} onDeleteUser={this.props.onDeleteUser}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>Username</th>
						<th>Password</th>
						<th>Email</th>
					</tr>
					{users}
				</tbody>
			</table>
		)
	}
}

class User extends React.Component{

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete() {
		this.props.onDeleteUser(this.props.user);
	}

	render() {
		return (
			<tr>
				<td>{this.props.user.username}</td>
				<td>{this.props.user.password}</td>
				<td>{this.props.user.email}</td>
				<td><button onClick={this.handleDelete}>Delete</button></td>
			</tr>
		)
	}
}


export {UserList}