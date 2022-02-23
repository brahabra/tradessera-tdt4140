import React from "react";
import { Form, Button, Input} from "./components/styles/Form.styled"

class Login extends React.Component {
    
	constructor(props) {
		super(props);
		this.state = {uname: '', pass: ''};
		this.handleSubmit = this.handleSubmit.bind(this);
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
                } else{
                    alert('Wrong password, please try again');
                }
            }
            
        }
		this.state.uname = '';
		this.state.pass = '';
	}
    
	render() {
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