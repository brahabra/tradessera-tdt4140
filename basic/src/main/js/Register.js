import React from "react";
import { Form, Button, Input} from "./components/styles/Form.styled"

class Register extends React.Component{
    
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
		const newUser = {username: this.state.uname, password: this.state.pass};
		this.props.onCreateUser(newUser);
		alert('A name was submitted: ' + this.state.uname + "\nAnd a password: " + this.state.pass);
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
					<Button>Register</Button>
				</Form>
		)
	}
}
/** Dette var den tidligere knappen
 * <input type="submit" value="Register" />
 */

export {Register}