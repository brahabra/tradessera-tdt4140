import { Alert } from "bootstrap";
import React from "react";

import {Form, Button, Input} from "./components/styles/Form.styled"

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user: this.props.profileUser, rating: ""};
        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeRating = this.handleChangeRating.bind(this);
        this.handleReport = this.handleReport.bind(this);
    }

    handleChangeRating(event) {
		let {value} = event.target;
		this.setState({rating: value});
	}

    handleSubmit(e) {
		e.preventDefault();
        const username = this.props.profileUser.username;
        const password = this.props.profileUser.password;
        const email = this.props.profileUser.email;
        const bio = this.props.profileUser.bio;
        let rate = Number(this.state.rating);
        const rating = (rate + this.props.profileUser.rating);
        const numRating = this.props.profileUser.numRating + 1;
        const admin = this.props.profileUser.admin;
        console.log(rating, numRating);
        const newUser = ({username, password, email, bio, rating, numRating, admin});
        if(rate < 11 && rate > 0) {
            this.props.onUpdateRating(newUser, this.props.profileUser);
        } else {
            alert("Please rate again between 1 and 10");
        }
        
        this.state.rating = '';  // clear out the dialog's inputs
	}

    handleReport() {
        const report = ({reporter: this.props.currentUser.username, reported: this.props.profileUser.username});
        this.props.onReport(report);
        alert("User has been reported");
    }

    render() {


        return (
            <div className="container">
                <Form onSubmit={this.handleSubmit}>
                <h1>{this.props.profileUser.username}</h1>
                Email: {this.props.profileUser.email}
                <br></br>
                Bio: {this.props.profileUser.bio}
                <br></br>
                Rating: {Math.floor(this.props.profileUser.rating/this.props.profileUser.numRating)} / 10
                <br></br>
                    <Input type="number" value={this.state.rating} placeholder="Enter Rating"
                     onChange={event => this.handleChangeRating(event)}/>
                     <Button>Confirm</Button>
                </Form>
                <Button onClick={this.handleReport}>Report User</Button>
            </div>
        )
    }

    
}

export {UserProfile}