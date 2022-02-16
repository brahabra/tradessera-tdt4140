import React from "react";


class Login extends React.Component{
    
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
					<input type="submit" value="Login" />
				</form>
			</div>
		)
	}
}

export {Login}