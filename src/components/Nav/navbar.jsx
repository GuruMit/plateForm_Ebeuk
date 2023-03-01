import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import css from './nav.module.css'

const NavBar = () => {
  return (

   
    <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className='justify-content-center flex-grow-1 pe-3' id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/annonce">
            <Nav.Link>Annonces</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/inscription">
            <Nav.Link>S'incrire</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/connexion">
            <Nav.Link>Connexion</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
   
    </Navbar>
    
  );
};

export default NavBar;
