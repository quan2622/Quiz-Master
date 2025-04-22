import { useState } from "react";
import Select from 'react-select';
import "./ManageQuestion.scss"
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { TiMinus, TiPlus } from "react-icons/ti";
import { MdAddPhotoAlternate } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";

const ManageQuestion = () => {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const [question, setQuestion] = useState(
    [
      {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
          { id: uuidv4(), description: '', isCorrect: false },
        ]
      },
    ]
  )


  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const new_question = {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        answers: [
          { id: uuidv4(), description: '', isCorrect: false },
        ]
      };
      setQuestion([...question, new_question]);
    }
    if (type === "REMOVE") {
      let question_clone = _.cloneDeep(question);
      question_clone = question_clone.filter(item => item.id !== id);
      setQuestion(question_clone);
    }
  }

  const handleAddRemoveAnswer = (type, q_Id, a_Id) => {
    let question_clone = _.cloneDeep(question);
    if (type === 'ADD') {
      const new_answer = {
        id: uuidv4(),
        description: '',
        isCorrect: false
      };
      question_clone = question_clone.map(item => {
        if (item.id === q_Id) {
          item.answers.push(new_answer);
        }
        return item;
      })
      setQuestion(question_clone);
    }
    if (type === 'REMOVE') {
      const index = question_clone.findIndex(item => item.id === q_Id);
      question_clone[index].answers = question_clone[index].answers.filter(answer => answer.id !== a_Id);
      // console.log('check data REMOVE: ', question_clone);
      setQuestion(question_clone);
    }
  }

  const handleOnChange = (type, q_Id, data) => {
    if (type === 'QUESTION') {
      let question_clone = _.cloneDeep(question);
      const index = question_clone.findIndex(item => item.id === q_Id);
      if (index > -1) {
        question_clone[index].description = data;
        setQuestion(question_clone);
      }
    }
  }

  const handleOnChangeFile = (q_Id, event) => {
    let question_clone = _.cloneDeep(question);
    const index = question_clone.findIndex(item => item.id === q_Id);
    if (index > -1 && event.target.files && event.target.files[0]) {
      question_clone[index].imageFile = event.target.files[0];
      question_clone[index].imageName = event.target.files[0].name;
      setQuestion(question_clone);
    }
  }

  const handleAnswerQuestion = (type, q_Id, a_Id, value) => {

    let question_clone = _.cloneDeep(question);
    const index = question_clone.findIndex(item => item.id === q_Id);
    if (index > -1) {
      question_clone[index].answers = question_clone[index].answers.map(a => {
        if (a.id === a_Id) {
          if (type === 'CHECKBOX') {
            a.isCorrect = value;
          }
          if (type === 'ANSWER') {
            a.description = value;
          }
        }
        return a;
      });
      setQuestion(question_clone);
    }
  }

  const hanleSaveQuestion = () => {
    console.log(">>(render)check data: ", question);
  }

  return (
    <div className="question-container">
      <div className="title">
        Manage Question
      </div>
      <div className="add-new-question">
        <div className="col-7 form-group">
          <label className="mb-2">Select Quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3 mb-2">
          Add question
        </div>
        {question && question.length > 0 && question.map((item, index) => {
          return (
            <div className="question-content mb-5" key={item.id}>
              <div className="question">
                <div className="form-floating description ">
                  <input
                    type="type"
                    className="form-control"
                    placeholder="name@example.com"
                    value={item.description}
                    onChange={(event) => handleOnChange('QUESTION', item.id, event.target.value)}
                  />
                  <label>Question {index + 1}'s Description</label>
                </div>
                <label className="group-upload" htmlFor={`${item.id}`}>
                  <span className="title"> <MdAddPhotoAlternate className="icon-upload" /> Upload Image: </span>
                  <input
                    id={`${item.id}`}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(event) => handleOnChangeFile(item.id, event)}
                  />

                  <span>{item.imageFile ? `${item.imageName}` : '0 file was uploaded'}</span>

                </label>
                <div className="btn-add">
                  <span onClick={() => handleAddRemoveQuestion('ADD', '')}><FiPlusCircle className="icon-add" /></span>
                  {question && question.length > 1 &&
                    <span onClick={() => handleAddRemoveQuestion('REMOVE', item.id)}><FiMinusCircle className="icon-remove" /></span>
                  }
                </div>
              </div>
              <div className="answer-container">
                {item.answers && item.answers.length > 0 && item.answers.map((a, index) => {
                  return (
                    <div className="answer" key={a.id}>
                      <input
                        type={'checkbox'}
                        className="check-box isCorrect"
                        checked={a.isCorrect}
                        onChange={(event) => handleAnswerQuestion('CHECKBOX', item.id, a.id, event.target.checked)}
                      />
                      <div className="form-floating answer-description ">
                        <input
                          type="type"
                          className="form-control"
                          placeholder="Answer 1"
                          value={a.description}
                          onChange={(event) => handleAnswerQuestion('ANSWER', item.id, a.id, event.target.value)}
                        />
                        <label>Answer {index + 1}</label>
                      </div>
                      <div className="btn-add">
                        <span onClick={() => handleAddRemoveAnswer('ADD', item.id, '')} ><TiPlus className="icon-add" /></span>
                        {item.answers.length > 1 &&
                          <span onClick={() => handleAddRemoveAnswer('REMOVE', item.id, a.id)} ><TiMinus className="icon-remove" /></span>
                        }
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      {question && question.length > 0 &&
        <div>
          <button className="btn btn-warning" onClick={() => hanleSaveQuestion()} >Save Question</button>
        </div>
      }
    </div>
  )
}
export default ManageQuestion;