import React from "react";
import {Navbar, Nav, Container} from 'react-bootstrap';
//import Logo from '../../../Logo.png';
import {Link} from './components/styles/Form.styled'





export default class NavigatonBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                
                <Navbar.Brand href="..">
                    <img 
                    alt=""
                    src="./Logo.png"
                    width="30"
                    height="30"
                    /> {' '} Tradessera
                </Navbar.Brand>
                <Nav className="me-auto">
                <Link>
                <Nav.Link href="..">Home</Nav.Link>
                </Link>
                <Link>
                <Nav.Link href="register">Register</Nav.Link>
                </Link>
                <Link>
                <Nav.Link href="login">Login</Nav.Link>
                </Link>
                <Link>
                <Nav.Link href="users">Users</Nav.Link>
                </Link>
                <Link>
                <Nav.Link href="posts">Posts</Nav.Link>
                </Link>
                <Link>
                <Nav.Link href="createPost">CreatePost</Nav.Link>
                </Link>
                <Link>
                <Nav.Link href="profile">Profile</Nav.Link>
                </Link>
                </Nav>
                
            </Navbar>
        )
    }   
}