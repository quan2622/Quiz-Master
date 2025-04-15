import video_HomePage from "../../assest/video-homepage.mp4"

const HomePage = (props) => {
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
            <button className="btn-classic btn-section">Get started—it's free</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;