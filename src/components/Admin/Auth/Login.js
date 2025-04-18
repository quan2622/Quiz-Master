import { NavLink } from "react-bootstrap";
import "./Login.scss"
import bgLogin from "../../../assest/bg-login.svg";
import { useState } from "react";
import { LoginAccount } from "../../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    let data = await LoginAccount(email, password);
    // console.log("data login: ", data);
    if (data && +data.EC === 0) {
      navigate('/');
      toast.success(data.EM);
    }
    if (data && +data.EC !== 0) {
      toast.warn(data.EM);
    }
  }

  return (
    <div className="login-container">
      <div className="header">
        <div className="logo">
          <NavLink to="/" className="navbar-brand" onClick={() => navigate('/')}>Quiz Master</NavLink>
        </div>
        <div className="helper">
          Have a question? Contact us
        </div>
      </div>
      <div className="body">
        <div className="container">
          <div className="row">
            <div className="col-md-6 left-side">
              <div className="login-form">
                <h2 className="title">Log in or Sign up</h2>
                <h3 className="sub-title">Get better results with interactive exams, practice quizzes & personalized assessments.</h3>
                <div className="content-form">
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input type={"email"} placeholder="Email address" className="form-control input-login" value={email} onChange={(event) => setEmail(event.target.value)} />
                  </div>
                  <div className="form-group mt-4">
                    <label className="form-label">Password</label>
                    <input type={"password"} placeholder="Password" className="form-control input-login" value={password} onChange={(event) => setPassword(event.target.value)} />
                  </div>

                  <div className="form-bottom">
                    <span>Forgot password ?</span>
                    <button className="btn-login" onClick={() => handleLogin()}>Login</button>
                    <div className="nav-signup">
                      or <span className="nav-title" onClick={() => navigate("/sign-up")}>&nbsp; Sign up &nbsp;</span> an account!
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <svg width="120%" height="114%" xmlns="http://www.w3.org/2000/svg">
                <image href={bgLogin} x="0" y="0" width="100%" height="100%" />
              </svg>

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login;