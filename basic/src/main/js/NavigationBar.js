import React from "react";
import {Navbar} from 'react-bootstrap';
//import Logo from '../../../Logo.png';
import {Nav, NavMenu, NavLink, NavLogo} from './components/styles/Form.styled'





export default class NavigatonBar extends React.Component {
    render() {
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
                <NavLink to='/register' activeStyle>Register</NavLink>
                <NavLink to='/login' activeStyle>Login</NavLink>
                <NavLink to='/posts' activeStyle>Posts</NavLink>
                <NavLink to='/createPost' activeStyle>CreatePost</NavLink>
                <NavLink to='/profile' activeStyle>Profile</NavLink>
                
                </NavMenu>
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