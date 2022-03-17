import React from "react";


class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {numUsers: 0, numPosts: 0};
		this.handleChangeAdmin = this.handleChangeAdmin.bind(this);
    }

	handleChangeAdmin() {

	}


    render() {
        this.state.numUsers = 0;
        this.state.numPosts = 0;
        this.props.users.forEach(element => {
            this.state.numUsers++;
        });
        this.props.posts.forEach(element => {
            this.state.numPosts++;
        });
        return (
            <div>
                <h1>This is the admin page</h1>
                <h2>Number of Users: {this.state.numUsers}</h2> 
                <br></br>
                <h2>Number of Posts: {this.state.numPosts}</h2> 
                <br></br>
                
            </div>
        )
    }

    
}

export {AdminPage}