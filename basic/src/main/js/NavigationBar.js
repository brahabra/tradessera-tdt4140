import React from "react";
import {Navbar, Nav, Container} from 'react-bootstrap';




export default class NavigatonBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="..">Home</Nav.Link>
                <Nav.Link href="register">Register</Nav.Link>
                <Nav.Link href="login">Login</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        )
    }   
}