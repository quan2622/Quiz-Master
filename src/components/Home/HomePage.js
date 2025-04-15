import video_HomePage from "../../assest/video-homepage.mp4"

const HomePage = (props) => {
  return (
    <>
      <div>
        <video autoPlay muted loop>
          <source src={video_HomePage} type="video/mp4" />
        </video>
      </div>
    </>
  )
}

export default HomePage;