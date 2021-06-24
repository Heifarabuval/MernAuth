import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, NavLink} from "react-bootstrap";
import {Link} from "react-router-dom";

/*console.log(localStorage.getItem('authToken'));*/
const Header = props => {
    const [isLogged, setIsLogged] = useState( localStorage.getItem('authToken')!=null);
    const logoutHandler=()=>{
        localStorage.removeItem('authToken');
        props.history.push("/login")
    }

       return (
           <Navbar collapseOnSelect expand="lg" className={'btn-primary-custom'} variant="dark">
               <Navbar.Brand href="/">MERN</Navbar.Brand>
               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav">
                   <Nav className="mr-auto">
                       <NavLink  href="/" class={'text-light'}>Home</NavLink>
                       <NavLink href={'/'+localStorage.getItem('userId')} class={'text-light'}>MonBlog</NavLink>
                   </Nav>
                   <Nav>
                       <Button variant='danger' onClick={logoutHandler}>Logout</Button>
                      {/* <Nav.Link eventKey={2} href="#memes">
                           Dank memes
                       </Nav.Link>*/}
                   </Nav>

               </Navbar.Collapse>

           </Navbar>
       );

};

Header.propTypes = {
    
};

export default Header;
