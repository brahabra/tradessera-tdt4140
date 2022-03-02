import {Register} from './Register';
import {Login} from './Login';
import {UserList} from './UserList';
import {PostList} from './PostList';
import {CreatePost} from './CreatePost';
import {Profile} from './Profile';

import NavigationBar from './NavigationBar';
import Home from "./Home";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const follow = require('./follow');
const root = '/api';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {users: [], currentUser: JSON.parse(localStorage.getItem("currentUser")) || {}, posts: [], attributes: [], pageSize: 2, links: {}};
		this.onCreateUser = this.onCreateUser.bind(this);
		this.onLogin = this.onLogin.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onDeleteUser = this.onDeleteUser.bind(this);
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.onUpdateBio = this.onUpdateBio.bind(this);
	}

	componentDidMount() {
		this.loadUsersFromServer();
		this.loadPostsFromServer();
	}

	loadUsersFromServer() {
		follow(client, root, [
			{rel: 'users'}]
		).then(userCollection => {
			return client({
				method: 'GET',
				path: userCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				return userCollection;
			});
		}).done(userCollection => {
			this.setState({
				users: userCollection.entity._embedded.users,
				links: userCollection.entity._links});
		});
	}
	loadPostsFromServer() {
		follow(client, root, [
			{rel: 'posts'}]
		).then(postCollection => {
			return client({
				method: 'GET',
				path: postCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return postCollection;
			});
		}).done(postCollection => {
			this.setState({
				posts: postCollection.entity._embedded.posts,
				attributes: Object.keys(this.schema.properties),
				links: postCollection.entity._links});
		});
	}

	onCreateUser(newUser) {
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
			this.loadUsersFromServer();
		});
	}

	onLogin(currentUser) {
		this.state.currentUser = currentUser;
		localStorage.setItem("currentUser", JSON.stringify(currentUser))
		this.loadPostsFromServer();
	}
	
	onChangeBio(currentUser) {
		this.state.currentUser = currentUser;
		//this method is not finished. To be used in profile.js
	}

	onLogout() {
		this.state.currentUser = {};
		localStorage.setItem("currentUser", JSON.stringify(this.state.currentUser))
		this.loadPostsFromServer();
	}

	onCreate(newPost) {
		follow(client, root, ['posts']).then(postCollection => {
			return client({
				method: 'POST',
				path: postCollection.entity._links.self.href,
				entity: newPost,
				headers: {'Content-Type': 'application/json'}
			})
		}).then(response => {
			return follow(client, root, [
				{rel: 'posts', params: {'size': this.state.pageSize}}]);
		}).done(response => {
			if (typeof response.entity._links.last !== "undefined") {
				this.onNavigate(response.entity._links.last.href);
			} else {
				this.onNavigate(response.entity._links.self.href);
			}
		});
	}

	onDeleteUser(user) {
		for (let index = 0; index < this.state.posts.length; index++) {
            const post = this.state.posts[index];
            if(post.username == user.username){
                this.onDelete(post);
            }
        }
		client({method: 'DELETE', path: user._links.self.href}).done(response => {
			this.loadUsersFromServer();
		});
		alert(user.username +  " and all it's posts were deleted");
	}


	onDelete(post) {
		client({method: 'DELETE', path: post._links.self.href}).done(response => {
			this.loadPostsFromServer(this.state.pageSize);
		});
	}

	onNavigate(navUri) {
		client({method: 'GET', path: navUri}).done(postCollection => {
			this.setState({
				posts: postCollection.entity._embedded.posts,
				attributes: this.state.attributes,
				pageSize: this.state.pageSize,
				links: postCollection.entity._links
			});
		});
	}

	updatePageSize(pageSize) {
		if (pageSize !== this.state.pageSize) {
			this.loadPostsFromServer(pageSize);
		}
	}

	onUpdateBio(newUser, oldUser){
		this.state.currentUser = newUser;
		client({method: 'DELETE', path: oldUser._links.self.href}).done(response => {
			this.loadUsersFromServer();
		});
		this.onCreateUser(newUser);

	}

	render() {
		return (
			<Router>
				<NavigationBar onLogout={this.onLogout} currentUser={this.state.currentUser}/>
				<Routes>
					<Route path='/' element={<Home />}/>
					<Route path='/login' element={<Login users={this.state.users} currentUser={this.state.currentUser} onLogin={this.onLogin} onLogout={this.onLogout}/>}/>
					<Route path='/users' element={<UserList users={this.state.users} onDeleteUser={this.onDeleteUser}/>}/>
					<Route path='/register' element={<Register users={this.state.users} onCreateUser={this.onCreateUser}/>}/>
					<Route path='/posts' element={<PostList posts={this.state.posts} currentUser={this.state.currentUser}
						links={this.state.links}
						pageSize={this.state.pageSize}
						onNavigate={this.onNavigate}
						onDelete={this.onDelete}
						updatePageSize={this.updatePageSize}/>}/>
					<Route path='/createPost' element={<CreatePost attributes={this.state.attributes} onCreate={this.onCreate}
						addPost={this.addPost} currentUser={this.state.currentUser}/>}/>
					<Route path='/profile' element= {<Profile users={this.state.users} currentUser={this.state.currentUser} onUpdateBio={this.onUpdateBio}/>} />
				</Routes>
			</Router>
		)
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('react')
)
