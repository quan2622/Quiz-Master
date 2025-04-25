import SideBar from "./SideBar";
import { FaBars } from 'react-icons/fa';
import "./Admin.scss"
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import Languages from "../Header/Languages";
import { NavDropdown } from "react-bootstrap";

const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span className="left-header" onClick={() => setCollapsed(!collapsed)} >
            <FaBars />
          </span>
          <div className="right-header">
            <Languages />
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Log out</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  )
}

export default Admin;