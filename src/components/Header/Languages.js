import { NavDropdown } from "react-bootstrap";
import { MdOutlineLanguage } from "react-icons/md";

const Languages = () => {
  return (
    <>
      <NavDropdown title={
        <>
          <MdOutlineLanguage style={{ marginRight: "2px", fontSize: '24px' }} />
          Việt Nam
        </>
      } id="basic-nav-dropdown2" className="languages">
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Item >Việt Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  )
}

export default Languages;