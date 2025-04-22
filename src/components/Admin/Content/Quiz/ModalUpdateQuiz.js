import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiImageAddLine } from "react-icons/ri";
import { toast } from "react-toastify";
import _ from "lodash";
import Select from "react-select";
import "./ManageQuiz.scss"
import { updateQuiz } from "../../../../services/quizService";


const ModelUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, resetData } = props
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
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      options.forEach(item => {
        if (item.value === dataUpdate.difficulty) {
          setDifficulty(item);
        }
      })
      setQuizImage('');
      if (dataUpdate.image) {
        setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);



  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let fileURL = URL.createObjectURL(file);
      setPreviewImg(fileURL);
      setQuizImage(file);
      console.log("check image upload: ", quizImage);
    }
  }

  const handleUpdateQuiz = async () => {
    if (!name && !description) {
      toast.warn("Name/Description is required!");
      return;
    }

    const res = await updateQuiz(dataUpdate.id, name, description, difficulty?.value, quizImage);
    console.log(res);
    if (res && res.EC === 0) {
      props.fetchDataQuiz();
      handleClose();
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update Infomation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <label >Name</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <label >Description</label>
          </div>
          <div className="more-action">
            <label htmlFor="input-file-update" className="form-label" id="drop-area">
              <input id="input-file-update" type="file" accept="image/*" hidden onChange={e => handleUploadImage(e)} />
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
              />
              <button className="btn btn-primary" onClick={() => handleUpdateQuiz()} >Submit</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModelUpdateQuiz;