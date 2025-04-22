import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { RiImageAddLine } from "react-icons/ri";
import _ from "lodash";
import Select from "react-select";
import "./ManageQuiz.scss"


const ModalViewQuiz = (props) => {
  const { show, setShow, dataQuiz, resetData } = props
  const handleClose = () => {
    setShow(false);
    setName('');
    setDescription('');
    setDifficulty('');
    setQuizImage('');
    setPreviewImg('');
    resetData();
  }

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [quizImage, setQuizImage] = useState('');
  const [previewImg, setPreviewImg] = useState('');

  const options = [
    { value: '', label: 'Select Difficulty', isDisabled: true },
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
  ];

  useEffect(() => {
    if (!_.isEmpty(dataQuiz)) {
      setName(dataQuiz.name);
      setDescription(dataQuiz.description);
      options.forEach(item => {
        if (item.value === dataQuiz.difficulty) {
          setDifficulty(item);
        }
      })
      setQuizImage('');
      if (dataQuiz.image) {
        setPreviewImg(`data:image/jpeg;base64,${dataQuiz.image}`);
      }
    }
  }, [dataQuiz]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Infomation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} disabled />
            <label >Name</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} disabled />
            <label >Description</label>
          </div>
          <div className="more-action">
            <label className="form-label" id="drop-area">
              {/* <input id="input-file-update" type="file" accept="image/*" hidden disabled={true} /> */}
              <div className="col-md-12 img-preview">
                {previewImg ?
                  <img src={previewImg} alt="image-upload" />
                  :
                  <span><RiImageAddLine /> Upload Image Quiz Here!</span>
                }
              </div>
            </label>
            <div className="select-container">
              <Select
                value={difficulty}
                onChange={setDifficulty}
                options={options}
                placeholder={'Select quiz type'}
                isDisabled={true}
              />
              <button className="btn btn-secondary" onClick={() => handleClose()}>Close</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalViewQuiz;