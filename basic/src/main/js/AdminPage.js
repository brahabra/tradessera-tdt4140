import React from "react";

import {ReportList} from './ReportList';

class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {numUsers: 0, numPosts: 0, numClosed: 0};
    }



    render() {
        console.log(this.props.reports);
        this.state.numUsers = 0;
        this.state.numPosts = 0;
        this.state.numClosed = 0;
        this.props.users.forEach(element => {
            this.state.numUsers++;
        });
        this.props.posts.forEach(element => {
            this.state.numPosts++;
            if(element.closed){
                this.state.numClosed++;
            }
        });
        return (
            <div className="container">
                <h1>This is the admin page</h1>
                <h2>Number of Users: {this.state.numUsers}</h2> 
                <br></br>
                <h2>Number of Posts: {this.state.numPosts}</h2> 
                <br></br>
                <h2>Number of Closed Posts: {this.state.numClosed}</h2> 
                <br></br>
                
                <ReportList reports={this.props.reports} onDeleteReport={this.props.onDeleteReport}/>
            </div>
            
        ) //
    }

    
}

export {AdminPage}