import React from "react";


class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {user: this.props.profileUser};
    }

    render() {


        return (
            <div>
                <h1>{this.props.profileUser.username}</h1>
                {this.props.profileUser.email}
                <br></br>
                {this.props.profileUser.bio}
            </div>
        )
    }

    
}

export {UserProfile}