import React from "react";

import {Form, Button, Input, Header} from "./components/styles/Form.styled"

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {bio: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeBio = this.handleChangeBio.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        //const newUser = null;
    }

	handleChangeBio(event) {
		let {value} = event.target;
		this.setState({bio: value});
	}

    handleDelete() {
		this.props.onDeleteUser(this.props.currentUser);
        this.props.onLogout();
	}

    handleSubmit(e) {
		e.preventDefault();
        const username = this.props.currentUser.username;
        const password = this.props.currentUser.password;
        const email = this.props.currentUser.email;
        const rating = this.props.currentUser.rating;
        const numRating = this.props.currentUser.numRating;
        const admin = this.props.currentUser.admin;
        const newUser = ({username, password, email, bio: this.state.bio, rating, numRating, admin});
        for (let index = 0; index < this.props.users.length; index++) {
            const oldUser = this.props.users[index];
            if(oldUser.username == this.props.currentUser.username){
                this.props.onUpdateUser(newUser, oldUser, true);
            }
        }
        this.state.bio = '';  // clear out the dialog's inputs
	}

    render() {
       console.log(this.props.currentUser);
        return (
            <div className='container'>
                <Header>{this.props.currentUser.username}</Header>
                
                <Form onSubmit={this.handleSubmit}>
                {this.props.currentUser.email}
                <br/>
                {this.props.currentUser.bio}
                <br/>
                    <Input type="text" value={this.state.bio} placeholder="Enter Bio"
                     onChange={event => this.handleChangeBio(event)}/>
                     <Button>Confirm</Button>
                </Form>
                <Button onClick={this.handleDelete}>Delete User</Button>
                
            </div>
        )
    }
}

export {Profile}