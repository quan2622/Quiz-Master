import { NavLink } from "react-bootstrap";
import "./Signup.scss"
import bgSignup from "../../assest/bg-signup.svg";
import { useState } from "react";
import { SignupAccount } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Languages from "../Header/Languages";

const Signup = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassWord] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };


  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      toast.error("Invalid Email!");
      return;
    }
    if (!password) {
      toast.warn("Please enter your password!");
      return;
    }
    let dataUser = {
      email: email,
      password: password,
      username: username,
    }
    let data = await SignupAccount(dataUser);
    // console.log("data login: ", data);
    if (data && +data.EC === 0) {
      navigate('/login');
      toast.success(data.EM);
    }
    if (data && +data.EC !== 0) {
      toast.warn(data.EM);
    }
  }

  return (
    <div className="signup-container">

      <div className="body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5">
              <div className="left-side">
                <div className="title-page">
                  Sign up<br /> and come on in
                </div>
                <div className="img-bg">
                  {/* <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                    <image href={bgSignup} x="0" y="0" width="100%" height="100%" />
                  </svg> */}
                  <svg viewBox="0 0 800 555" xmlns="http://www.w3.org/2000/svg">
                    <rect width="800" height="555" fill="#3c323e" />

                    <circle cx="130" cy="400" r="140" fill="#4a3e4c" opacity="0.4" />
                    <circle cx="680" cy="155" r="130" fill="#473948" opacity="0.5" />
                    <path d="M-50,300 Q200,100 400,350 T850,250" stroke="#534759" stroke-width="30" fill="none" opacity="0.3" />

                    <rect x="150" y="120" width="500" height="360" rx="20" fill="#2a2231" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.3))" />

                    <rect x="150" y="120" width="500" height="80" rx="20" fill="#e6a85d" />
                    <rect x="150" y="180" width="500" height="20" fill="#e6a85d" />

                    <text x="400" y="170" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#2a2231" text-anchor="middle">PERSONALITY QUIZ</text>

                    <text x="400" y="240" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">Which element describes you best?</text>

                    <g transform="translate(200, 300)">
                      <circle cx="0" cy="0" r="40" fill="#5dadbd" />
                      <path d="M-20,-10 Q0,-30 20,-10 Q35,5 20,20 Q0,30 -20,20 Q-35,5 -20,-10" fill="#4a97a7" />
                      <text x="0" y="5" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">Water</text>
                    </g>

                    <g transform="translate(330, 300)">
                      <polygon points="0,-40 35,20 -35,20" fill="#e65d5e" />
                      <polygon points="0,-20 20,10 -20,10" fill="#d34a4b" />
                      <text x="0" y="40" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">Fire</text>
                    </g>

                    <g transform="translate(470, 300)">
                      <rect x="-40" y="-40" width="80" height="80" fill="#6abe76" />
                      <path d="M-25,-25 L25,-25 L25,25 L-25,25 Z" fill="#58a864" stroke="#58a864" stroke-width="5" />
                      <text x="0" y="60" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">Earth</text>
                    </g>

                    <g transform="translate(600, 300)">
                      <circle cx="0" cy="0" r="40" fill="#c388db" />
                      <path d="M-30,-10 Q0,-30 30,-10 Q30,10 0,30 Q-30,10 -30,-10" fill="#b376cc" stroke="#b376cc" stroke-width="2" />
                      <text x="0" y="60" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">Air</text>
                    </g>

                    <circle cx="350" cy="420" r="8" fill="#e6a85d" />
                    <circle cx="380" cy="420" r="8" fill="rgba(255,255,255,0.3)" />
                    <circle cx="410" cy="420" r="8" fill="rgba(255,255,255,0.3)" />
                    <circle cx="440" cy="420" r="8" fill="rgba(255,255,255,0.3)" />

                    <rect x="325" y="450" width="150" height="50" rx="25" fill="#e6a85d" />
                    <text x="400" y="482" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#2a2231" text-anchor="middle">NEXT</text>

                    <circle cx="100" cy="200" r="70" fill="#e6a85d" opacity="0.7" />
                    <circle cx="700" cy="400" r="90" fill="#e6a85d" opacity="0.7" />
                    <path d="M650,120 Q800,200 700,350" stroke="#e6a85d" stroke-width="15" fill="none" opacity="0.5" />
                    <path d="M150,350 Q0,450 100,550" stroke="#e6a85d" stroke-width="15" fill="none" opacity="0.5" />
                  </svg>
                </div>
                <div className="left-side-bottom">
                  &copy; quan-nguyen
                </div>
              </div>

            </div>
            <div className="col-md-7">
              <div className="right-side">
                <div className="header">
                  <div className="languages-signup">
                    <Languages />
                  </div>
                  <div className="helper">
                    Already have an account? <button onClick={() => navigate("/login")}>Log in</button>
                  </div>
                </div>
                <div className="right-side-content">
                  <div className="logo">
                    <NavLink to="/" className="navbar-brand" onClick={() => navigate('/')}>Quiz Master</NavLink>
                    <span>Turn boring tests into conversations — create playful, smart online quizzes that actually talk back.</span>
                  </div>

                  <div className="login-form">
                    <div className="content-form">
                      <div className="form-group">
                        <label className="form-label">Email<span>*</span></label>
                        <input type={"email"} placeholder="Email address" className="form-control input-signup" value={email} onChange={(event) => setEmail(event.target.value)} />
                      </div>
                      <div className="form-group mt-4">
                        <label className="form-label">Password<span>*</span></label>
                        <input type={showPassword ? "text" : "password"} placeholder="Password" className="form-control input-signup input-password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <button className="showPassword" onMouseDown={() => setShowPassWord(!showPassword)} onMouseUp={() => setShowPassWord(!showPassword)}>
                          {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                        </button>
                      </div>
                      <div className="form-group mt-4">
                        <label className="form-label">User name</label>
                        <input type={"text"} placeholder="User name" className="form-control input-signup" value={username} onChange={(event) => setUsername(event.target.value)} />
                      </div>

                      <div className="form-bottom">
                        <button className="btn-login" onClick={() => handleSignUp()}>Sign up</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Signup;