import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";


const Header = () => {
  const account = useSelector(state => state.user.account);
  const isAuthencated = useSelector(state => state.user.isAuthencated);
  // console.log("account: ", account);
  // console.log("is authencated: ", isAuthencated);

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  return (
    // <Navbar expand="lg" className="bg-body-tertiary" onScroll={() => handleScrollHeader()}>
    <Navbar expand="lg" className={`bg-body-tertiary`}>
      <Container>
        <NavLink to="/" className="navbar-brand">Quiz Master</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/users" className="nav-link">Users</NavLink>
            <NavLink to="/admin" className="nav-link">Admin</NavLink>
          </Nav>
          <Nav className="justify-content-end">
            {!isAuthencated ?
              <>
                <button className="btn-classic btn-login" onClick={() => handleLogin()}>Log in</button>
                <button className="btn-classic btn-signup" onClick={() => navigate("/sign-up")}>Sign up</button>
              </>
              :
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item>Log out</NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;