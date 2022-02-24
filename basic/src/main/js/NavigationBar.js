import React from "react";
import {Navbar, Nav, Container} from 'react-bootstrap';
//import Logo from '../../../Logo.png';





export default class NavigatonBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="..">
                    <img 
                    alt=""
                    src="./Logo.png"
                    width="30"
                    height="30"
                    /> {' '} Tradessera
                </Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="..">Home</Nav.Link>
                <Nav.Link href="register">Register</Nav.Link>
                <Nav.Link href="login">Login</Nav.Link>
                <Nav.Link href="users">Users</Nav.Link>
                <Nav.Link href="posts">Posts</Nav.Link>
                <Nav.Link href="createPost">CreatePost</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        )
    }   
}