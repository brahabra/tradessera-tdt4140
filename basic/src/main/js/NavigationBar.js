import React from "react";
import { Link } from 'react-router-dom'
import {Navbar, Form, ButtonGroup} from 'react-bootstrap';
//import Logo from '../../../Logo.png';
import {Nav, NavMenu, NavLink, NavLogo, NavLogin, Button} from './components/styles/Form.styled'

export default class NavigatonBar extends React.Component {
    render() {
        let logInOrOut;
        if(this.props.currentUser.username != null){
            logInOrOut = <Button onClick={this.props.onLogout}>Log out</Button>;
        } else {
            logInOrOut = <div>
                        <Button as={Link} to="/login">Login  </Button>
                        <Button as={Link} to="/register">Register</Button>
                        </div>;
        }
        let admin;
        if(this.props.currentUser.admin){
            admin = <div><NavLink to='/admin' >Admin</NavLink>
                        <NavLink to='/users' >Users</NavLink></div>;
        } else {
            admin = <div></div>;
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
                
                <NavLink to='/posts' >Posts</NavLink>
                <NavLink to='/createPost' >CreatePost</NavLink>
                <NavLink to='/profile' >Profile</NavLink>
                {admin}
                
                </NavMenu>
                <NavLogin>{logInOrOut}</NavLogin>

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