import React from "react";
import { Form, Button, Input} from "./components/styles/Form.styled"

class Login extends React.Component {
    
	constructor(props) {
		super(props);
		this.state = {uname: '', pass: ''};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangePass = this.handleChangePass.bind(this);
	}

	handleChangeName(event) {
		let {value} = event.target;
		this.setState({uname: value});
	}
	handleChangePass(event) {
		let {value} = event.target;
		this.setState({pass: value});
	}
	
	handleSubmit(event) {
		event.preventDefault();
        for (let index = 0; index < this.props.users.length; index++) {
            const element = this.props.users[index];
            if(element.username == this.state.uname){
                console.log("Found user");
                if(element.password == this.state.pass){
                    alert('You have sucessfully logged in ' + this.state.uname);
                    this.props.onLogin(element);
					this.state.uname = '';
					this.state.pass = '';
					return;
                } else{
                    alert('Wrong password, please try again');
                }
            }
        }
		alert('Username not found, please try again');
	}

	handleLogout(event) {
		event.preventDefault();
        this.props.onLogout();
	}
    
	render() {
		if(this.props.currentUser.username != null){
			return <div>
				{this.props.currentUser.username} is loggged in
				<br></br>
				<Button onClick={this.handleLogout}>Log out</Button>
			</div>;
		}
		return (
				<Form onSubmit={this.handleSubmit}>
					<label>
						<Input type="text" value={this.state.uname} placeholder="Enter Username"
						 onChange={event => this.handleChangeName(event)} />
					</label>
					<br></br>
					<label>
						<Input type="text" value={this.state.pass} placeholder="Enter Password"
						 onChange={event => this.handleChangePass(event)} />
					</label>
					<br></br>
					<Button>Login</Button>
				</Form>
		)
	}
}

/**
 * <input type="submit" value="Login" />
 * form og div, se createpost og form.styled
 */

export {Login}