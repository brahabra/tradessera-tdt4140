import React from "react";
import { Link } from 'react-router-dom'
import {Navbar, Form, Button, ButtonGroup} from 'react-bootstrap';
//import Logo from '../../../Logo.png';
import {Nav, NavMenu, NavLink, NavLogo} from './components/styles/Form.styled'





export default class NavigatonBar extends React.Component {
    render() {
        let logInOrOut;
        if(this.props.currentUser.username != null){
            logInOrOut = <Button onClick={this.props.onLogout}>Log out</Button>;
        } else {
            logInOrOut = <ButtonGroup>
                        <Button as={Link} to="/login">Login</Button>
                        <Button as={Link} to="/register">Register</Button>
                        </ButtonGroup>;
        }
        return (
            <>
            <Nav>
                <NavMenu>
                <NavLogo>
                <Navbar.Brand href="..">
                    <img 
                    alt=""
                    src="./Logo.png"
                    width="30"
                    height="30"
                    /> {' '} Tradessera
                </Navbar.Brand>
                </NavLogo>
                <NavLink to='/register'>Register</NavLink>
                <NavLink to='/login' >Login</NavLink>
                <NavLink to='/posts' >Posts</NavLink>
                <NavLink to='/createPost' >CreatePost</NavLink>
                <NavLink to='/profile' >Profile</NavLink>
                
                </NavMenu>
                {logInOrOut}

            </Nav>
            </>
        )
    }
    /*
    <Link>
                <Nav.Link href="..">Home</Nav.Link>
                </Link>
    <Link>
                <Nav.Link href="users">Users</Nav.Link>
                </Link>
    */   
}