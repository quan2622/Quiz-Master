import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/quizService";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataQuiz, resetData } = props;

  const handleClose = () => {
    setShow(false);
    resetData();
  }

  const handelSubmitDelete = async () => {
    // call api
    let data = await deleteQuiz(dataQuiz.id)
    if (data && data.EC == 0) {
      toast.success(data.EM);
      await props.fetchDataQuiz();
      handleClose();
    }
    if (data && data.EC !== 0) {
      toast.warn(data.EM);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Are you sure to delete this quiz!</h6>
          <p>Quiz: <b>{dataQuiz && dataQuiz.name ? dataQuiz.name : ''}</b></p>
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

export default ModalDeleteQuiz;