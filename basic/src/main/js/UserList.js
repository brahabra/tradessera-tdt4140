import React from 'react';

import { Link } from 'react-router-dom'
import {Button, TableHeadStyles} from "./components/styles/Form.styled"

class UserList extends React.Component{
	render() {
		const users = this.props.users.map(user =>
			<User key={user._links.self.href} user={user} onDeleteUser={this.props.onDeleteUser} currentUser={this.props.currentUser} onUpdateUser={this.props.onUpdateUser} onNavProfile={this.props.onNavProfile}/>
		);
		return (
			<table>
				
				<TableHeadStyles>
					<tr>
						<th>Username</th>
						<th>Password</th>
						<th>Email</th>
						<th>Bio</th>
						<th>Rating</th>
					</tr>
				<tbody>
					{users}
				</tbody>
				</TableHeadStyles>
			</table>
		)
	}
}

class User extends React.Component{

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleSetAdmin = this.handleSetAdmin.bind(this);
		this.handleNavigate = this.handleNavigate.bind(this);
	}

	handleDelete() {
		this.props.onDeleteUser(this.props.user);
	}

	handleSetAdmin() {
		let newUser = this.props.user;
		newUser.admin=true;
		this.props.onUpdateUser(newUser, this.props.user, false);
	}

	handleNavigate() {
		console.log("Updated profile user");
		this.props.onNavProfile(this.props.user);
	}

	render() {
		let delButton;
		if(this.props.currentUser != null){
			if(this.props.currentUser.admin){
				if(this.props.user.admin){
					delButton = <td><Button onClick={this.handleDelete}>Delete</Button></td>;
				} else{
					delButton = <td><Button onClick={this.handleDelete}>Delete</Button>
							<Button onClick={this.handleSetAdmin}>Make Admin</Button></td>;
				}
			}
		} else{
			delButton = <td><Button></Button></td>
		}
		return (
			<tr>
				<td onClick={this.handleNavigate}><Link to="/userProfile">{this.props.user.username}</Link></td>
				<td>{this.props.user.password}</td>
				<td>{this.props.user.email}</td>
				<td>{this.props.user.bio}</td>
				<td>{Math.floor(this.props.user.rating/this.props.user.numRating)} / 10</td>
				{delButton}
			</tr>
		)
	}
}


export {UserList}