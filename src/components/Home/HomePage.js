import { useSelector } from "react-redux";
import video_HomePage from "../../assest/video-homepage.mp4"
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';

const HomePage = (props) => {
  const account = useSelector(state => state.user.account);
  const isAuthencated = useSelector(state => state.user.isAuthencated);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <div className="homepage-container">
        <video autoPlay muted loop>
          <source src={video_HomePage} type="video/mp4" />
        </video>
        <div className="homepage-content">
          <h1 className="title-setion">

            {t('HomePage.titleSection')}
          </h1>
          <p className="desc-section">
            {t('HomePage.descripttionSection')}
          </p>
          <div>
            {isAuthencated == false ?
              <button className="btn-classic btn-section" onClick={() => navigate('/login')}>
                {t('HomePage.btnSection.title1')}
              </button>
              :
              <button className="btn-classic btn-section" onClick={() => navigate("/users")}>
                {t('HomePage.btnSection.title2')}
              </button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;