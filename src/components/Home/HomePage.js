import { useSelector } from "react-redux";
import video_HomePage from "../../assest/video-homepage.mp4"
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const account = useSelector(state => state.user.account);
  const isAuthencated = useSelector(state => state.user.isAuthencated);
  const navigate = useNavigate();

  return (
    <>
      <div className="homepage-container">
        <video autoPlay muted loop>
          <source src={video_HomePage} type="video/mp4" />
        </video>
        <div className="homepage-content">
          <h1 className="title-setion">Get to know your customers with forms worth filling out</h1>
          <p className="desc-section">Collect all the data you need to understand customers with forms designed to be refreshingly different.</p>
          <div>
            {isAuthencated == false ?
              <button className="btn-classic btn-section" onClick={() => navigate('/login')}>Get started—it's free</button>
              :
              <button className="btn-classic btn-section" onClick={() => navigate("/users")}>Doing Quiz Now!</button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;