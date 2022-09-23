import {Register} from './Register';
import {Login} from './Login';
import {UserList} from './UserList';
import {PostList} from './PostList';
import {CreatePost} from './CreatePost';
import {Profile} from './Profile';
import {AdminPage} from './AdminPage';
import {UserProfile} from './UserProfile';

import NavigationBar from './NavigationBar';
import Home from "./Home";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Body} from './components/styles/Form.styled'

'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const follow = require('./follow');
const root = '/api';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {users: [], posts: [], reports: [], attributes: [], pageSize: 2, links: {}, 
		currentUser: JSON.parse(localStorage.getItem("currentUser")) || {},
		profileUser: JSON.parse(localStorage.getItem("profileUser")) || {}, 
		sort: JSON.parse(localStorage.getItem("sort")) || 0};
		this.onCreateUser = this.onCreateUser.bind(this);
		this.onLogin = this.onLogin.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onDeleteUser = this.onDeleteUser.bind(this);
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.onUpdateUser = this.onUpdateUser.bind(this);
		this.onUpdateRating = this.onUpdateRating.bind(this);
		this.onNavProfile = this.onNavProfile.bind(this);
		this.onSort = this.onSort.bind(this);
		this.onReport = this.onReport.bind(this);
		this.onDeleteReport = this.onDeleteReport.bind(this);
	}

	componentDidMount() {
		this.loadUsersFromServer();
		this.loadReportsFromServer();
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
	loadReportsFromServer() {
		follow(client, root, [
			{rel: 'reports'}]
		).then(reportCollection => {
			return client({
				method: 'GET',
				path: reportCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				return reportCollection;
			});
		}).done(reportCollection => {
			this.setState({
				reports: reportCollection.entity._embedded.reports,
				links: reportCollection.entity._links});
		});
		
	}

	onCreateUser(newUser) {
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
		this.onLogin(newUser);
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
// fix later
	onClose(post) {
		post.closed = true;
		client({method: 'PUT', path: post._links.self.href, entity: post, headers: {'Content-Type': 'application/json'}}).done(response => {
			this.loadPostsFromServer();
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

	onUpdateUser(newUser, oldUser, update){
		client({method: 'PUT', path: oldUser._links.self.href, entity: newUser, headers: {'Content-Type': 'application/json'}}).done(response => {
			this.loadUsersFromServer();
		});
		if(update){
			this.state.currentUser = newUser;
			localStorage.setItem("currentUser", JSON.stringify(this.state.currentUser));
		}
	}

	onUpdateRating(newUser, oldUser){
		client({method: 'PUT', path: oldUser._links.self.href, entity: newUser, headers: {'Content-Type': 'application/json'}}).done(response => {
			this.loadUsersFromServer();
		});
		this.state.profileUser = newUser;
		localStorage.setItem("profileUser", JSON.stringify(this.state.profileUser));
		window.location.reload(false);
	}

	onNavProfile(user){
		this.state.profileUser = user;
		localStorage.setItem("profileUser", JSON.stringify(this.state.profileUser));
		window.location.reload(false);
	}

	onSort(sort){
		this.state.sort = sort;
		localStorage.setItem("sort", JSON.stringify(this.state.sort));
		window.location.reload(false);
	}

	onReport(report) {
		follow(client, root, ['reports']).then(response => {
			return client({
				method: 'POST',
				path: response.entity._links.self.href,
				entity: report,
				headers: {'Content-Type': 'application/json'}
			})
		}).then(response => {
			return follow(client, root, [{rel: 'reports'}]);
		}).done(response => {
			this.loadReportsFromServer();
		});
		
	}

	onDeleteReport(report) {
		client({method: 'DELETE', path: report._links.self.href}).done(response => {
			this.loadReportsFromServer();
		});

	}

	render() {
		return (
			<div className='body'>
			<Router>
				<NavigationBar onLogout={this.onLogout} currentUser={this.state.currentUser}/>
				<Routes>
					<Route path='/' element={<Home />}/>
					<Route path='/login' element={<Login users={this.state.users} currentUser={this.state.currentUser} onLogin={this.onLogin} onLogout={this.onLogout}/>}/>
					<Route path='/users' element={<UserList users={this.state.users} onDeleteUser={this.onDeleteUser} currentUser={this.state.currentUser} onUpdateUser={this.onUpdateUser} onNavProfile={this.onNavProfile}/>}/>
					<Route path='/register' element={<Register users={this.state.users} onCreateUser={this.onCreateUser}/>}/>
					<Route path='/posts' element={<PostList posts={this.state.posts} users={this.state.users} currentUser={this.state.currentUser}  onNavProfile={this.onNavProfile}
						links={this.state.links}
						pageSize={this.state.pageSize}
						onNavigate={this.onNavigate}
						onDelete={this.onDelete}
						onClose={this.onClose}
						onSort={this.onSort} sort={this.state.sort}
						updatePageSize={this.updatePageSize}/>}/>
					<Route path='/createPost' element={<CreatePost attributes={this.state.attributes} onCreate={this.onCreate}
						addPost={this.addPost} currentUser={this.state.currentUser}/>}/>
					<Route path='/profile' element= {<Profile users={this.state.users} currentUser={this.state.currentUser} onDeleteUser={this.onDeleteUser} onUpdateUser={this.onUpdateUser} onLogout={this.onLogout}/>}/>
					<Route path='/admin' element={<AdminPage users={this.state.users} posts={this.state.posts} reports={this.state.reports} onDeleteReport={this.onDeleteReport}/>}/>
					<Route path='/userProfile' element={<UserProfile key={this.state.profileUser} profileUser={this.state.profileUser} currentUser={this.state.currentUser} onUpdateRating={this.onUpdateRating} onReport={this.onReport}/>}/>
				</Routes>
			</Router>
			</div>
		)
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('react')
)
