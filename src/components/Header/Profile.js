import { useEffect, useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, LogOut, updateProfile } from "../../services/authService";
import { toast } from "react-toastify";
import { doLogout, doUpdateProfile } from "../../redux/action/userAction";
import './Profile.scss'
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { getHistoryQuizUser } from "../../services/quizService";
import dayjs from "dayjs";
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button as AntButton, Modal as AntModal, Space } from 'antd';
import { useNavigate } from "react-router-dom";


const Profile = (props) => {
  const { show, setShow } = props;
  const info_user = useSelector(state => state.user.account);
  const [username, setUserName] = useState(info_user?.username ? info_user?.username : '');
  const [image, setImage] = useState(info_user?.image ? info_user?.image : '');
  const [imagePreview, setImagePreview] = useState(info_user?.image ? `data:image/jpeg;base64,${info_user?.image}` : '');

  const [activeTab, setActiveTab] = useState('home');

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [checkPassword, setCheckPassword] = useState(true);
  const [checkNewPassword, setCheckNewPassword] = useState(true);
  const [checkConfirm, setCheckConfirm] = useState(true);


  const [history, setHistory] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // ant design
  const { confirm } = AntModal;

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await getHistoryQuizUser();
    if (res.EC === 0) {
      const raw = res?.DT?.data;
      let DT_History = raw.map((item, index) => ({
        id: item.id,
        total_questions: item.total_questions,
        total_correct: item.total_correct,
        quiz_name: `(${item.quizHistory?.id}) - ${item.quizHistory?.name}`,
        date: dayjs(item.createdAt).format('DD-MM-YYYY HH:mm:ss A')
      }));

      setHistory(DT_History);
    } else {
      toast.error(res.EM);
    }
  }
  // console.log(">>> ", history);

  const handleClose = () => {
    setShow(false);
  }

  const handleUploadImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
      setImagePreview(URL.createObjectURL(img));
    }
  }

  useEffect(() => {
    setCheckPassword(true);
  }, [password]);

  useEffect(() => {
    setCheckNewPassword(true);
  }, [newPassword]);

  useEffect(() => {
    if (newPassword === confirmPassword)
      setCheckConfirm(true);
  }, [confirmPassword]);

  const handleLogOut = async () => {
    let res = await LogOut(info_user.email, info_user.refresh_token);
    if (res && res.EC === 0) {
      // clear data redux
      dispatch(doLogout());
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  }

  const handleSubmit = async () => {
    if (activeTab === 'home') {
      confirm({
        title: 'Do you want to save this change?',
        icon: <ExclamationCircleFilled />,
        onOk: async () => {
          const res = await updateProfile(username, image);
          if (res.EC === 0) {
            dispatch(doUpdateProfile(res.DT));
            toast.success(res.EM);
          } else {
            toast.error(res.EM);
          }

        },
        onCancel() {
          toast.warn('Cancel this change!');
        },
      });

    }
    if (activeTab === 'password') {
      confirm({
        title: 'Confirm to change your password',
        icon: <ExclamationCircleFilled />,
        content: 'After making changes, you will need to log in again.',
        onOk: async () => {
          if (!password) {
            setCheckPassword(false);
            toast.warn('Required Your Password');
            return;
          }
          if (!newPassword) {
            setCheckNewPassword(false);
            toast.warn('Enter New Password');
            return;
          }
          if (newPassword !== confirmPassword) {
            setCheckConfirm(false);
            toast.warn('Please re-enter your new password!');
            return;
          }
          const res = await changePassword(password, newPassword);
          if (res.EC === 0) {
            toast.success(res.EM);
            setPassword('');
            setNewPassword('');
            setConfirmPassword('');
            handleLogOut();
            setShow(false);
            navigate('/login');
          } else {
            toast.error(res.EM);
          }
        },
        onCancel() {
          toast.warn('Cancel change password');
        },
      });


    }
  }

  return (
    <Modal show={show} onHide={handleClose} size="xl" backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="home"
          id="justify-tab-example"
          className="mb-3"
          justify
          onSelect={(key) => setActiveTab(key)}
        >
          <Tab eventKey="home" title="Main Info">
            <form className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={info_user?.email} disabled />
              </div>
              <div className="col-md-4">
                <label className="form-label">Username</label>
                <input type="text" className="form-control"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Role</label>
                <select className="form-select" value={info_user?.role} disabled>
                  <option value='USER'>USER</option>
                  <option value='ADMIN'>ADMIN</option>
                </select>
              </div>
              <div className="col-md-12">
                <div className="form-label">
                  <span>Avatar</span>
                </div>
                <label htmlFor="input-file" className="form-label" id="drop-area">
                  <input id="input-file" type="file" accept="image/*" hidden onChange={e => handleUploadImage(e)} />
                  <div className="col-md-12 img-preview">
                    {imagePreview ?
                      <img src={imagePreview} alt="image-upload" />
                      :
                      <span><FiUpload /> Upload Image Here!</span>
                    }
                  </div>
                </label>
              </div>
            </form>
          </Tab>
          <Tab eventKey="password" title="Password">
            <div className="input-group mb-3">
              <span className="input-group-text flex-shrink-0" id="basic-addon1">Password</span>
              <input
                type="password"
                className={`form-control ${checkPassword ? '' : 'is-invalid'}`}
                placeholder="Present Password"
                aria-describedby="basic-addon1 passwordFeedback"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div id="passwordFeedback" className="invalid-feedback">
                Please enter your password!
              </div>
            </div>
            <div className="input-group mb-3 new-password">
              <span className="input-group-text flex-shrink-0" id="basic-addon2">New Password</span>
              <span className="show-new-password" onMouseDown={() => setShowPassword(!showPassword)} onMouseUp={() => setShowPassword(!showPassword)}>{showPassword ? <VscEye /> : <VscEyeClosed />}</span>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${checkNewPassword ? '' : 'is-invalid'}`}
                placeholder="New Password"
                aria-describedby="basic-addon2 newPasswordFeedback"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <div id="newPasswordFeedback" className="invalid-feedback">
                Please enter new password!
              </div>
            </div>
            <div className="input-group mb-3 new-password">
              <span className="input-group-text flex-shrink-0" id="basic-addon2">Confirm Password</span>
              <span className="show-new-password" onMouseDown={() => setShowConfirm(!showConfirm)} onMouseUp={() => setShowConfirm(!showConfirm)}>{showConfirm ? <VscEye /> : <VscEyeClosed />}</span>
              <input
                type={showConfirm ? 'text' : 'password'}
                className={`form-control ${checkConfirm ? '' : 'is-invalid'}`}
                placeholder="New Password"
                aria-describedby="basic-addon2 newConfirmFeedback"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div id="newConfirmFeedback" className="invalid-feedback">
                Please re-enter new password!
              </div>
            </div>
          </Tab>
          <Tab eventKey="history" title="History">
            <div className="history">
              <PerfectScrollbar>
                <table className="table table-hover table-bordered table-history">
                  <thead>
                    <tr className="table-info">
                      <th scope="col">ID</th>
                      <th scope="col">Quiz Name</th>
                      <th scope="col">Total Question</th>
                      <th scope="col">Total Correct</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history && history.length > 0 &&
                      history.map((item, index) => {
                        return (
                          <tr key={`history-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.quiz_name}</td>
                            <td>{item.total_questions}</td>
                            <td>{item.total_correct}</td>
                            <td>{item.date}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </PerfectScrollbar>
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        {activeTab !== 'history' &&
          <Button variant="outline-primary" onClick={() => handleSubmit()}>{activeTab === 'home' ? 'Save' : 'Change'}</Button>
        }
        <Button variant="secondary" onClick={() => handleClose()}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Profile;