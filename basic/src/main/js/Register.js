import React from "react";
import { LoginForm, Button, Input} from "./components/styles/Form.styled"

class Register extends React.Component{
    
	constructor(props) {
		super(props);
		this.state = {uname: '', pass: '', mail: ''};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangePass = this.handleChangePass.bind(this);
		this.handleChangeMail = this.handleChangeMail.bind(this);
	}

	handleChangeName(event) {
		let {value} = event.target;
		this.setState({uname: value});
	}
	handleChangePass(event) {
		let {value} = event.target;
		this.setState({pass: value});
	}
	handleChangeMail(event) {
		let {value} = event.target;
		this.setState({mail: value});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		let available = true;
		for (let index = 0; index < this.props.users.length; index++) {
            const element = this.props.users[index];
            if(element.username == this.state.uname){
                alert('Username already taken, please try another');
				available = false;
			}
		}
		if(available){
			const newUser = {username: this.state.uname, password: this.state.pass, email: this.state.mail, bio: "", rating: 0, numRating: 1};
			this.props.onCreateUser(newUser);
			alert('Successfully regstered: ' + this.state.uname + "\nWith mail: " + this.state.mail);
		}

		this.state.uname = '';
		this.state.pass = '';
		this.state.mail = '';
	}
    
	render() {
		return (
			<div className="container">
				<LoginForm onSubmit={this.handleSubmit}>
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
					<label>
						<Input type="text" value={this.state.mail} placeholder="Enter Email"
						 onChange={event => this.handleChangeMail(event)} />
					</label>
					<br></br>
					<Button>Register</Button>
				</LoginForm>
			</div>
		)
	}
}
/** Dette var den tidligere knappen
 * <input type="submit" value="Register" />
 */

export {Register}