import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiImageAddLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/userService";
import _ from "lodash";


const ModelUpdateUser = (props) => {
  const { show, setShow, dataUserUpdate, resetDataUpdateUser } = props
  const handleClose = () => {
    setShow(false);
    setUserName('');
    setPassWord('');
    setEmail('');
    setRole('');
    setAvt('');
    setPreviewImg('');
    resetDataUpdateUser();
  }

  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const [avt, setAvt] = useState('');
  const [previewImg, setPreviewImg] = useState('');

  useEffect(() => {
    if (!_.isEmpty(dataUserUpdate)) {
      setUserName(dataUserUpdate.username);
      setEmail(dataUserUpdate.email);
      setRole(dataUserUpdate.role);
      setAvt('');
      if (dataUserUpdate.image) {
        setPreviewImg(`data:image/jpeg;base64,${dataUserUpdate.image}`);
      }
    }
  }, [dataUserUpdate]);


  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let fileURL = URL.createObjectURL(file);
      setPreviewImg(fileURL);
      setAvt(file);
    }
  }

  const handleSubmit = async () => {
    // validate
    if (!userName) {
      toast.error('Invalid User Name');
      return;
    }

    // call api
    let data = await putUpdateUser(dataUserUpdate.id, userName, role, avt)
    // console.log(">> Component create user: ", data);
    if (data && data.EC == 0) {
      toast.success(data.EM);
      setTimeout(() => {
        handleClose()
      }, 1000)
      await props.fetchListUser();
    }
    if (data && data.EC !== 0) {
      toast.warn(data.EM);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Infomation User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={passWord} onChange={e => setPassWord(e.target.value)} disabled />
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

export default ModelUpdateUser;