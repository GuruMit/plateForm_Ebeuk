import React, { useContext } from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../contexts/authContext";
// import { AuthContext, useAuth } from "../../contexts/authContext";
import css from "./nav.module.css";

const NavBar = () => {

  const { currentUser , Logout , role } = useAuth();
   // Check if the user has the "client" custom claim
   const isClient = role   
console.log('is client'+ isClient)



   return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse
        className="justify-content-center flex-grow-1 pe-3" 
        id="basic-navbar-nav"
      >
        <Nav className="mr-auto">
          <LinkContainer to="/">
            <Nav.Link>Annonces</Nav.Link>
          </LinkContainer>
          {!currentUser ? (
            <>
              <LinkContainer to="/inscription">
                <Nav.Link>S'incrire</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/connexion">
                <Nav.Link>Connexion</Nav.Link>
              </LinkContainer>
            </>
          ) : (
            <>
              {isClient === 'client' ? (
               <LinkContainer to="/profile">
               <Nav.Link>Profile</Nav.Link>
             </LinkContainer>
              ) : null}
              
              <LinkContainer to="/">
                <Nav.Link onClick={Logout}>Déconnexion</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
