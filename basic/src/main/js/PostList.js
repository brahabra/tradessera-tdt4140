import React, {useState} from "react";

import {Button, Input, TableStyles, TableHeadStyles} from "./components/styles/Form.styled"
import { Link } from 'react-router-dom'

const ReactDOM = require('react-dom');

class PostList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {search: "", sorted: null};
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.sortPosts = this.sortPosts.bind(this);
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

	handleSort(col){
		this.props.onSort(col);
	}

	sortPosts(col) {	
		let temp = this.props.posts;
		this.state.sorted = temp.sort(function(a,b) {
		let aData;
		let bData;
			if(col == 0){
				aData = a.username;
				bData = b.username;
			}
			else if(col == 1){
				aData = a.title;
				bData = b.title;
			}
			else if(col == 2){
				aData = a.text;
				bData = b.text;
			}
			else if(col == 3){
				aData = a.price;
				bData = b.price;
			}
			else if(col == 4){
				aData = a.location;
				bData = b.location;
			}
			else if(col == 5){
				aData = a.eventType;
				bData = b.eventType;
			}
			else if(col == 6){ //does not work due to post.rating not being in use
				aData = Math.floor(a.rating/a.numRating);
				bData = Math.floor(b.rating/b.numRating);
			}


			if(aData > bData){
				return 1;
			} if (aData < bData) {
				return -1;
			}
			else {
				return 0;
			}
		})
		
	}

	render() {

		if(this.state.sorted == null){
			this.state.sorted = this.props.posts;
		}

		this.sortPosts(this.props.sort);

		const posts = this.state.sorted.map(post =>
			<Post key={post._links.self.href} post={post} users={this.props.users} onDelete={this.props.onDelete} onClose={this.props.onClose} currentUser={this.props.currentUser}  onNavProfile={this.props.onNavProfile}/>
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
					<TableHeadStyles>
						<tr>
							<th onClick={() => this.handleSort(0)}>User</th>
							<th onClick={() => this.handleSort(1)}>Title</th>
							<th onClick={() => this.handleSort(2)}>Text</th>
							<th onClick={() => this.handleSort(3)}>Price</th>
							<th onClick={() => this.handleSort(4)}>Location</th>
							<th onClick={() => this.handleSort(5)}>EventType</th>
							<th onClick={() => this.handleSort(6)}>Rating</th>
							<th>      </th>
						</tr>
						<tbody>
							{posts.filter((val) => {
								if (!val.props.post.closed){
									return val
								}
							}).filter((val) => {
								if (val.props.post.title.toLowerCase().includes(this.state.search.toLowerCase())) {
									return val
									}
							})}
							
						</tbody>
					</TableHeadStyles>
				</table>
			</div>
		)
	}
}

class Post extends React.Component {

	constructor(props) {
		super(props);
		this.state = {user: {}};
		this.handleDelete = this.handleDelete.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleContact = this.handleContact.bind(this);
		this.handleNavigate = this.handleNavigate.bind(this);
	}

	handleDelete() {
		this.props.onDelete(this.props.post);
	}
	
	
	handleClose() {
		this.props.onClose(this.props.post);
	}
	

	handleContact() {
		alert('Contact this user on this email: ' + this.props.post.email);
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
		if(this.props.post.username == this.props.currentUser.username || this.props.currentUser.admin){
			button = <div><Button onClick={this.handleDelete}>Delete</Button>
						<Button onClick={this.handleClose}>Close</Button></div>;
		}
		else {
			button = <Button onClick={this.handleContact}>Contact</Button>;
		}
		let user = null;
		for (let index = 0; index < this.props.users.length; index++) {
            const oldUser = this.props.users[index];
            if(oldUser.username == this.props.post.username){
                user = oldUser;
				this.state.user = user;
            }
        }
		let rating = 0;
		if (user != null) {
			rating = Math.floor(user.rating/user.numRating);
		}
		
		
		console.log(this.state.search);
		return (
			<tr>
				<td onClick={() => this.handleNavigate()}><Link to="/userProfile">{this.props.post.username}</Link></td>
				<td>{this.props.post.title}</td>
				<td>{this.props.post.text}</td>
				<td>{this.props.post.price}</td>
				<td>{this.props.post.location}</td>
				<td>{this.props.post.eventType}</td>
				<td>{rating} / 10</td>
				<td>{button}</td>
			</tr>
		)
	}
}

export {PostList}


	//const [order, setorder] = useState("ASC")
	const sorting = (col) => {
		if (order == "ASC") {
			const sorted = [...sortPosts].sort((a,b)=>
				a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
			)
			setdata(sorted)
			setorder("DSC")
		}
		if (order == "DSC") {
			const sorted = [...sortPosts].sort((a,b)=>
				a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
			)
			setdata(sorted)
			setorder("ASC")
		}
	}

	/*className="table table-bordered"*/
	/*'*/