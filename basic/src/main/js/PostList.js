import React from "react";

import {Button, Input} from "./components/styles/Form.styled"

const ReactDOM = require('react-dom');

class PostList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {search: ""};
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
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
	
	handleSearch(event) {
		let {value} = event.target;
		this.setState({search: value});
	}

	render() {
		const posts = this.props.posts.map(post =>
			<Post key={post._links.self.href} post={post} onDelete={this.props.onDelete} currentUser={this.props.currentUser}/>
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
			<div className='container'>
				<Input type="text" value={this.state.search} placeholder="Search for title..."
				onChange={event => this.handleSearch(event)} />
				<table className="table table-bordered">
					<tbody>
						<tr>
							<th>User</th>
							<th>Title</th>
							<th>Text</th>
						</tr>
						{posts.filter((val) => {
							if (val.props.post.title.toLowerCase().includes(this.state.search.toLowerCase())) {
								return val
							}
						})}
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
	}

	handleDelete() {
		this.props.onDelete(this.props.post);
	}

	handleContact() {
		alert('Contact this user on this email: ' + this.props.post.email);
		console.log("Contact not impllemented yet"); //implement this later
	}

	render() {
		let button;
		if(this.props.post.username == this.props.currentUser.username){
			button = <Button onClick={this.handleDelete}>Delete</Button>;
		}
		else{
			button = <Button onClick={this.handleContact}>Contact</Button>;
		}
		
		
		console.log(this.state.search);
		return (
			<tr>
				<td>{this.props.post.username}</td>
				<td>{this.props.post.title}</td>
				<td>{this.props.post.text}</td>

				<td>{button}</td>
			</tr>
		)
	}
}

export {PostList}