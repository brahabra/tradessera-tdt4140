import React from "react";

import {Form, Button, Input} from "./components/styles/Form.styled"

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {bio: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeBio = this.handleChangeBio.bind(this);
        //const newUser = null;
    }

	handleChangeBio(event) {
		let {value} = event.target;
		this.setState({bio: value});
	}

    handleSubmit(e) {
		e.preventDefault();
        const username = this.props.currentUser.username
        const password = this.props.currentUser.password
        const email = this.props.currentUser.email
        const newUser = ({username, password, email, bio: this.state.bio});
        for (let index = 0; index < this.props.users.length; index++) {
            const oldUser = this.props.users[index];
            if(oldUser.username == this.props.currentUser.username){
                this.props.onUpdateBio(newUser, oldUser);
                alert('Successfully updated the bio');
            }
        }
        this.state.bio = '';  // clear out the dialog's inputs
	}

    render() {
        /*
        let inp;
        if(this.props.currentUser.bio == null) {
            return <Input />
        }
        */
        return (
            <div>
                <h1>{this.props.currentUser.username}</h1>
                {this.props.currentUser.email}
                <br></br>
                {this.props.currentUser.bio}
                <Form onSubmit={this.handleSubmit}>
                    <Input type="text" value={this.state.bio} placeholder="Enter Bio"
                     onChange={event => this.handleChangeBio(event)}/>
                     <Button>Confirm</Button>
                </Form> 
            </div>
        )
    }

    
}

export {Profile}