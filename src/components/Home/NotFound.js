import { useNavigate } from "react-router-dom";
import "./NotFound.scss"

const NotFound = () => {
  const navigate = useNavigate();
  return (
    // <div className="alert alert-danger container mt-4">404. Not found data with this your current URL</div>
    <div className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="four-zero-four-bg">
              <h2>404</h2>
            </div>
            <div className="content">
              <h3>Look like you're lost</h3>
              <p>the page you are look for not available!</p>
              <button onClick={() => navigate('/home')}>Go to home page</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default NotFound;