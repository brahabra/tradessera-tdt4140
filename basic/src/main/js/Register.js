import React from "react";


class Register extends React.Component{
    
	constructor(props) {
		super(props);
		this.state = {uname: '', mail: '', pass: ''};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeMail = this.handleChangeMail.bind(this);
		this.handleChangePass = this.handleChangePass.bind(this);
	}

	handleChangeName(event) {
		let {value} = event.target;
		this.setState({uname: value});
	}
	handleChangeMail(event) {
		let {value} = event.target;
		this.setState({mail: value});
	}
	handleChangePass(event) {
		let {value} = event.target;
		this.setState({pass: value});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		const newUser = {username: this.state.uname, email: this.state.mail, password: this.state.pass};
		this.props.onCreate(newUser);
		alert('A name was submitted: ' + this.state.uname + "\nA mail: " + this.state.mail + "\nAnd a password: " + this.state.pass);
		this.state.uname = '';
		this.state.mail = '';
		this.state.pass = '';
	}
    
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<label>
						Username:
						<input type="text" value={this.state.uname} placeholder="Enter Username"
						 onChange={event => this.handleChangeName(event)} />
					</label>
					<br></br>
					<label>
						Email:
						<input type="text" value={this.state.mail} placeholder="Enter Email"
						 onChange={event => this.handleChangeMail(event)} />
					</label>
					<br></br>
					<label>
						Password:
						<input type="text" value={this.state.pass} placeholder="Enter Password"
						 onChange={event => this.handleChangePass(event)} />
					</label>
					<br></br>
					<input type="submit" value="Register" />
				</form>
			</div>
		)
	}
}

export {Register}