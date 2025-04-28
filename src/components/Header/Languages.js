import { NavDropdown } from "react-bootstrap";
import { MdOutlineLanguage } from "react-icons/md";
import { useTranslation, Trans } from 'react-i18next';



const Languages = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
    // console.log('check language: ', i18n.language);
  }

  return (
    <>
      <NavDropdown title={
        <>
          <MdOutlineLanguage style={{ marginRight: "2px", fontSize: '24px' }} />
          {i18n.language === 'vi' ? 'Việt Nam' : 'English'}
        </>
      } id="basic-nav-dropdown2" className="languages">
        <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Việt Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  )
}

export default Languages;