import { NavLink } from "react-bootstrap";
import "./Login.scss"
import bgLogin from "../../assest/bg-login.svg";
import { useState } from "react";
import { LoginAccount } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner } from "react-icons/im";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassWord] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


  const handleLogin = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid Email!");
      return;
    }
    if (!password) {
      toast.warn("Please enter your password!");
      return;
    }

    setIsLoading(true)
    let data = await LoginAccount(email, password);
    // console.log("data login: ", data);
    if (data && +data.EC === 0) {
      dispatch(doLogin());
      toast.success(data.EM);
      setIsLoading(false);
      navigate('/');
    }
    if (data && +data.EC !== 0) {
      toast.warn(data.EM);
      setIsLoading(false);
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
                    <input type={showPassword ? "text" : "password"} placeholder="Password" className="form-control input-login input-password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <button className="showPassword" onMouseDown={() => setShowPassWord(!showPassword)} onMouseUp={() => setShowPassWord(!showPassword)}>
                      {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                    </button>
                  </div>

                  <div className="form-bottom">
                    <span>Forgot password ?</span>
                    <button className="btn-login" onClick={() => handleLogin()} disabled={isLoading}>
                      {isLoading == true && <ImSpinner className="loader-icon" />}
                      <span>Login</span>
                    </button>
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