import React from "react";



class Profile extends React.Component {

    constructor(props) {
            super(props);
    }

    render() {
        return (
            <div>
                {this.props.currentUser.username}
                {this.props.currentUser.email}
                {this.props.currentUser.description}
            </div>
        )
    }

    
}

export {Profile}