import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaGithub, FaRegLaughWink } from 'react-icons/fa';
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import sidebarBg from '../../assest/bg2.jpg';
import 'react-pro-sidebar/dist/css/styles.css';
import "./SideBar.scss"

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div className="sidebar-container"
          // style={{
          //   padding: '24px',
          //   textTransform: 'uppercase',
          //   fontWeight: 'bold',
          //   fontSize: 14,
          //   letterSpacing: '1px',
          //   overflow: 'hidden',
          //   textOverflow: 'ellipsis',
          //   whiteSpace: 'nowrap',
          // }}
          >
            <DiReact size={'3em'} color="00bfff" />
            <span>Quiz Master</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
            // suffix={<span className="badge red">new</span>}
            >
              Dashboard
            </MenuItem>
            {/* <MenuItem icon={<FaGem />}> components</MenuItem> */}
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              // suffix={<span className="badge yellow">3</span>}
              // icon={<FaRegLaughWink />}
              icon={<FaGem />}
              title="Features"
            >
              <MenuItem>Manage User</MenuItem>
              <MenuItem>Manage Quiz</MenuItem>
              <MenuItem>Manage Question</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <a
              href=""
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                QN_Production
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  )
}

export default SideBar;