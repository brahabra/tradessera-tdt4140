import React from "react";

import { Link } from 'react-router-dom'
import {Button} from "./components/styles/Form.styled"

const ReactDOM = require('react-dom');

class PostList extends React.Component {

	constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(e) {
		e.preventDefault();
		const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(pageSize);
		} else {
			ReactDOM.findDOMNode(this.refs.pageSize).value =
				pageSize.substring(0, pageSize.length - 1);
		}
	}

	handleNavFirst(e){
		e.preventDefault();
		this.props.onNavigate(this.props.links.first.href);
	}

	handleNavPrev(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.prev.href);
	}

	handleNavNext(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.next.href);
	}

	handleNavLast(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.last.href);
	}

	render() {
		const posts = this.props.posts.map(post =>
			<Post key={post._links.self.href} post={post} users={this.props.users} onDelete={this.props.onDelete} currentUser={this.props.currentUser}  onNavProfile={this.props.onNavProfile}/>
		);

		const navLinks = [];
		if ("first" in this.props.links) {
			navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
		}
		if ("prev" in this.props.links) {
			navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
		}
		if ("next" in this.props.links) {
			navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
		}
		if ("last" in this.props.links) {
			navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
		}

		return (
			<div>
				<table>
					<tbody>
						<tr>
							<th>User</th>
							<th>Title</th>
							<th>Text</th>
							<th>Price</th>
							<th>Location</th>
							<th>EventType</th>
							<th>Rating</th>
						</tr>
						{posts}
					</tbody>
				</table>
			</div>
		)
	}
}

class Post extends React.Component {

	constructor(props) {
		super(props);
		this.state = {username: ''};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleContact = this.handleContact.bind(this);
		this.handleNavigate = this.handleNavigate.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.post);
	}

	handleContact() {
		alert('Contact this user on this email: ' + this.props.post.email);
		console.log("Contact not impllemented yet"); //implement this later
	}

	handleNavigate() {
		console.log("Updated profile user");
		this.props.users.forEach(user => {
            if (user.username == this.props.post.username) {
				this.props.onNavProfile(user);
			}
        });

	}

	render() {
		let button;
		if(this.props.post.username == this.props.currentUser.username){
			button = <Button onClick={this.handleDelete}>Delete</Button>;
		}
		else {
			button = <Button onClick={this.handleContact}>Contact</Button>;
		}
		
		return (
			<tr>
				<td onClick={() => this.handleNavigate()}><Link to="/userProfile">{this.props.post.username}</Link></td>
				<td>{this.props.post.title}</td>
				<td>{this.props.post.text}</td>
				<td>{this.props.post.price}</td>
				<td>{this.props.post.location}</td>
				<td>{this.props.post.eventType}</td>
				<td>{this.props.post.rating}</td>

				<td>{button}</td>
			</tr>
		)
	}
}

export {PostList}