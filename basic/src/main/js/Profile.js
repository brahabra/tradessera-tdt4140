import React from "react";

import {Form, Button, Input} from "./components/styles/Form.styled"

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {email: '', bio: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangeBio = this.handleChangeBio.bind(this);
        const newUser = null;
    }

    handleChangeEmail(event) {
		let {value} = event.target;
		this.setState({email: value});
	}
	handleChangeBio(event) {
		let {value} = event.target;
		this.setState({bio: value});
	}

    handleSubmit(e) {
		e.preventDefault();
        const username = this.props.currentUser.username
        const password = this.props.currentUser.password

        this.props.onDeleteUser(this.props.currentUser);
        newUser = ({username, password, email: this.state.email});
        this.props.onCreateUser(newUser)
		// clear out the dialog's inputs
	}

    render() {
        
        if(this.state.email == "") {
            return  <Form onSubmit={this.handleSubmit}>
                    <Input type="text" value={this.state.email} placeholder="Enter Email"
                     onChange={event => this.handleChangeEmail(event)}/>
                     <Button>Confirm</Button>
                    </Form>
                    
        }
        /*
        if(this.props.currentUser.bio == null) {
            return <Input />
        }
        */
        return (
            <div>
                <h1>{this.props.currentUser.username}</h1>
                {this.newUser.email}
                {this.props.currentUser.bio}
            </div>
        )
    }

    
}

export {Profile}