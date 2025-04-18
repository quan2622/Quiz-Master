import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from "../../../services/userService";
import { toast } from "react-toastify";

const ModelDeleteUser = (props) => {
  const { show, setShow, dataUser, resetDataUser } = props;

  const handleClose = () => {
    setShow(false);
    resetDataUser();
  }

  const handelSubmitDelete = async () => {
    // call api
    let data = await deleteUser(dataUser.id)
    // console.log(">> Component create user: ", data);
    if (data && data.EC == 0) {
      toast.success(data.EM);
      handleClose();
      // await props.fetchListUser();
      // props.setCurrentPage(1);
      await props.fetchListUserPaginate(props.currentPage);
    }
    if (data && data.EC !== 0) {
      toast.warn(data.EM);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Are you sure to delete this user!</h6>
          <p>User email: <b>{dataUser && dataUser.email ? dataUser.email : ''}</b></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handelSubmitDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModelDeleteUser;