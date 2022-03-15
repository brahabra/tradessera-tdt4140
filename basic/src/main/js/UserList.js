import React from 'react';

import {Button} from "./components/styles/Form.styled"

class UserList extends React.Component{
	render() {
		const users = this.props.users.map(user =>
			<User key={user._links.self.href} user={user} onDeleteUser={this.props.onDeleteUser}/>
		);
		return (
			<div className='container'>
				<table className="table table-bordered">
					<tbody>
						<tr>
							<th>Username</th>
							<th>Password</th>
							<th>Email</th>
							<th>Bio</th>
						</tr>
						{users}
					</tbody>
				</table>
			</div>
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
				<td>{this.props.user.bio}</td>
				<td><Button onClick={this.handleDelete}>Delete</Button></td>
			</tr>
		)
	}
}


export {UserList}