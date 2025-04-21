import { useState } from "react";
import { RiImageAddLine } from "react-icons/ri";

import "./ManageQuiz.scss"
import Select from 'react-select';
import { addNewQuiz } from "../../../../services/quizService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";

const ManageQuiz = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('EASY');
  const [quizImage, setQuizImage] = useState('');
  const [previewImg, setPreviewImg] = useState('');

  const options = [
    { value: '', label: 'Select Difficulty', isDisabled: true },
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
  ];

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      let fileURL = URL.createObjectURL(file);
      setPreviewImg(fileURL);
      setQuizImage(file);
    }
  }

  const handleSubmitQuiz = async () => {
    // validate
    if (!name && !description) {
      toast.warn("Name/Description is required!");
      return;
    }

    const res = await addNewQuiz(name, description, difficulty?.value, quizImage);
    console.log(res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName('');
      setDescription('');
      setDifficulty('');
      setQuizImage('');
      setPreviewImg('');
    } else {
      toast.error(res.EM);
    }
  }

  return (
    <div className="quiz-container">
      <div className="title">
        Manage Quiz
      </div>
      <div className="add-new">

        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add New Quiz:</legend>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <label >Name</label>
          </div>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <label >Description</label>
          </div>
          <div className="more-action">
            <div className="select-container">
              <Select
                value={difficulty}
                onChange={setDifficulty}
                options={options}
                placeholder={'Select quiz type'}
              />
              <button className="btn btn-primary" onClick={() => handleSubmitQuiz()}>Submit</button>
            </div>
            <label htmlFor="input-file" className="form-label" id="drop-area">
              <input id="input-file" type="file" accept="image/*" hidden onChange={e => handleUploadImage(e)} />
              <div className="col-md-12 img-preview">
                {previewImg ?
                  <img src={previewImg} alt="image-upload" />
                  :
                  <span><RiImageAddLine /> Upload Image Quiz Here!</span>
                }
              </div>
            </label>
          </div>
        </fieldset>
      </div>
      <hr />
      <div className="list-detail">
        <TableQuiz />
      </div>
    </div>
  )
}

export default ManageQuiz;