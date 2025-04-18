import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiImageAddLine } from "react-icons/ri";
import _ from "lodash";


const ModelViewUser = (props) => {
  const { show, setShow, dataUser, resetDataUser } = props
  const handleClose = () => {
    setShow(false);
    setUserName('');
    setEmail('');
    setRole('');
    setPreviewImg('');
    resetDataUser();
  }

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('USER');
  const [previewImg, setPreviewImg] = useState('');

  useEffect(() => {
    if (!_.isEmpty(dataUser)) {
      setUserName(dataUser.username);
      setEmail(dataUser.email);
      setRole(dataUser.role);
      if (dataUser.image) {
        setPreviewImg(`data:image/jpeg;base64,${dataUser.image}`);
      }
    }
  }, [dataUser]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Infomation User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" disabled />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" value={userName} disabled />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select className="form-select" value={role} disabled>
                <option value='USER'>USER</option>
                <option value='ADMIN'>ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <div className="form-label">
                <span>Avatar</span>
              </div>
              <label htmlFor="input-file" className="form-label" id="drop-area">
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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelViewUser;