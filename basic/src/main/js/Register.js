import React from "react";


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
		let available = true;
		for (let index = 0; index < this.props.users.length; index++) {
            const element = this.props.users[index];
            if(element.username == this.state.uname){
                alert('Username already taken, please try another');
				available = false;
			}
		}
		if(available){
			const newUser = {username: this.state.uname, password: this.state.pass};
			this.props.onCreateUser(newUser);
			alert('A name was submitted: ' + this.state.uname + "\nAnd a password: " + this.state.pass);
		}

		this.state.uname = '';
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