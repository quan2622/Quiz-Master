import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiImageAddLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { postCreateUser } from "../../../services/userService";


const ModelCreateUser = (props) => {
  const { show, setShow } = props

  const handleClose = () => {
    setShow(false);
    setUserName('');
    setPassWord('');
    setEmail('');
    setRole('');
    setAvt('');
    setPreviewImg('');
  }

  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const [avt, setAvt] = useState('');
  const [previewImg, setPreviewImg] = useState('');

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let fileURL = URL.createObjectURL(file);
      setPreviewImg(fileURL);
      setAvt(file);
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async () => {
    // validate
    const isValidEmail = validateEmail(email)
    if (!isValidEmail) {
      toast.error('Invalid Email');
      return;
    }
    if (!passWord) {
      toast.error('Invalid Password');
      return;
    }
    if (!userName) {
      toast.error('Invalid User Name');
      return;
    }

    // call api
    let data = await postCreateUser(email, passWord, userName, role, avt)
    // console.log(">> Component create user: ", data);
    if (data && data.EC == 0) {
      toast.success(data.EM);
      setTimeout(() => {
        handleClose()
      }, 1000)
      // await props.fetchListUser();
      props.setCurrentPage(1);
      await props.fetchListUserPaginate(1);
    }
    if (data && data.EC !== 0) {
      toast.warn(data.EM);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={passWord} onChange={e => setPassWord(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" value={userName} onChange={e => setUserName(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
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
                  {previewImg ?
                    <img src={previewImg} alt="image-upload" />
                    :
                    <span><RiImageAddLine /> Upload Image Here!</span>
                  }
                </div>
              </label>
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelCreateUser;