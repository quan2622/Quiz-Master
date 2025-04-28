import { NavLink } from "react-bootstrap";
import "./Login.scss";
import bgLogin from "../../assest/bg-login.svg";
import { useState } from "react";
import { LoginAccount } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner } from "react-icons/im";
import Languages from "../Header/Languages";

const AdminLogin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassWord] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|.(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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

    setIsLoading(true);
    let data = await LoginAccount(email, password);
    if (data && +data.EC === 0) {
      if (data.DT && data.DT.role === 'ADMIN') {
        dispatch(doLogin(data.DT));
        toast.success("Admin login successful!");
        setIsLoading(false);
        navigate("/admin");
      } else {
        toast.error("You are not authorized as admin.");
        setIsLoading(false);
      }
    }
    if (data && +data.EC !== 0) {
      toast.warn(data.EM);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  }

  return (
    <div className="login-container">
      <div className="header">
        <div className="logo">
          <NavLink
            to="/admin"
            className="navbar-brand"
            onClick={() => navigate("/admin")}
          >
            Admin Panel
          </NavLink>
        </div>
        <div className="helper">
          Admin access only
          <Languages />
        </div>
      </div>
      <div className="body">
        <div className="container">
          <div className="row">
            <div className="col-md-6 left-side">
              <div className="login-form">
                <h2 className="title">Admin Login</h2>
                <h3 className="sub-title">
                  Please enter your admin credentials to access the dashboard.
                </h3>
                <div className="content-form">
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type={"email"}
                      placeholder="Admin email address"
                      className="form-control input-login"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className="form-label">Password</label>
                    <div className="login_password-container">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="form-control input-login input-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                      />
                      <button
                        className="showPassword"
                        onMouseDown={() => setShowPassWord(!showPassword)}
                        onMouseUp={() => setShowPassWord(!showPassword)}
                      >
                        {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                      </button>
                    </div>
                  </div>

                  <div className="form-bottom">
                    <span>Forgot password ?</span>
                    <button
                      className="btn-login"
                      onClick={() => handleLogin()}
                      disabled={isLoading}
                    >
                      {isLoading == true && (
                        <ImSpinner className="loader-icon" />
                      )}
                      <span>Login</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <svg
                width="120%"
                height="114%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image href={bgLogin} x="0" y="0" width="100%" height="100%" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
