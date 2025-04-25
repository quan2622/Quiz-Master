import { useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "../../services/authService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Languages from "./Languages";


const Header = () => {
  const account = useSelector(state => state.user.account);
  const isAuthencated = useSelector(state => state.user.isAuthencated);
  // console.log("account: ", account);
  // console.log("is authencated: ", isAuthencated);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }

  const handleLogOut = async () => {
    let res = await LogOut(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      // clear data redux
      dispatch(doLogout());
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
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
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogOut()}>Log out</NavDropdown.Item>
              </NavDropdown>
            }

            <Languages />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;