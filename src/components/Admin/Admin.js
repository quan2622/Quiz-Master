import SideBar from "./SideBar";
import { FaBars } from 'react-icons/fa';
import "./Admin.scss"
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import Languages from "../Header/Languages";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import { LogOut } from "../../services/authService";
import Profile from "../Header/Profile";

const Admin = (props) => {
  const account = useSelector(state => state.user.account);
  const [collapsed, setCollapsed] = useState(false);
  const [isShowProfile, setIsShowProfile] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogOut = async () => {
    let res = await LogOut(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      // clear data redux
      dispatch(doLogout());
      navigate('/login');
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  }
  return (
    <>
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
                <NavDropdown.Item onClick={() => setIsShowProfile(true)}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleLogOut()}>Log out</NavDropdown.Item>
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
      <Profile
        show={isShowProfile}
        setShow={setIsShowProfile}
      />
    </>
  )
}

export default Admin;