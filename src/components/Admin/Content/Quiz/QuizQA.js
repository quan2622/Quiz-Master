import { useEffect, useState } from "react";
import Select from 'react-select';
import "./QuizQA.scss"
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { TiMinus, TiPlus } from "react-icons/ti";
import { MdAddPhotoAlternate } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { getDataQuizTable, getQuizWithQuestionAnswer, postUpsertQA } from "../../../../services/quizService";
import { toast } from "react-toastify";

const QuizQA = () => {
  const init_question = [
    {
      id: uuidv4(),
      description: '',
      imageFile: '',
      imageName: '',
      is_valid_q: true,
      is_valid_a: true,
      answers: [
        {
          id: uuidv4(),
          description: '',
          isCorrect: false,
          is_valid: true,
        },
      ]
    },
  ];
  const [question, setQuestion] = useState(init_question);

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImage, setDataImage] = useState({
    title: '',
    url: '',
  });

  useEffect(() => {
    fetchListQuiz()
  }, []);

  useEffect(() => {
    fetchQuizWithQA();
  }, [selectedQuiz]);

  // convert Base64 String to javascript file object
  const urltoFile = (url, filename, mimeType) => {
    return fetch(url)
      .then(res => res.arrayBuffer())
      .then(buf => new File([buf], filename, { type: mimeType }));
  }

  const fetchQuizWithQA = async () => {
    if (!_.isEmpty(selectedQuiz)) {
      const res = await getQuizWithQuestionAnswer(selectedQuiz.value);
      console.log('check QA: ', res.DT);
      if (res && res.DT) {
        let question_clone = res.DT.qa;
        for (let q = 0; q < question_clone.length; q++) {
          let question = question_clone[q];

          question.is_valid_q = true;
          question.is_valid_a = true;
          if (question.imageFile) {
            question.imageFile = await urltoFile(`data:image/png;base64,${question.imageFile}`, `Question-${question.id}.png`, 'image/png');
            question.imageName = `Question-${question.id}.png`;
            // console.log("image convert: ", question.imageFile);
          }
          for (let a = 0; a < question.answers.length; a++) {
            question.answers[a].is_valid = true;
          }
        }
        // console.log(">>check data question: ", question_clone);
        setQuestion(question_clone);
      }
    }
  }


  const fetchListQuiz = async () => {
    // API get list quiz
    const res = await getDataQuizTable();
    if (res.EC === 0) {
      let new_quiz = res.DT.map(item => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name}`,
        }
      })
      setListQuiz(new_quiz);
    }
  }

  const handleAddRemoveQuestion = (type, id) => {
    if (type === 'ADD') {
      const new_question = {
        id: uuidv4(),
        description: '',
        imageFile: '',
        imageName: '',
        is_valid_q: true,
        is_valid_a: true,
        answers: [
          { id: uuidv4(), description: '', isCorrect: false, is_valid: true },
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
        isCorrect: false,
        is_valid: true,
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

  const hanleSaveQuestion = async () => {
    // todo
    if (!selectedQuiz) {
      toast.warn('Please select a quiz!');
      return;
    }


    let isValidate = true;
    let index_question = -1;
    let index_answer = -1;
    let count_correct = 0;
    let question_clone = _.cloneDeep(question);

    // validate question
    let isValidateQuestion = true;
    for (let q = 0; q < question.length; q++) {
      if (!question[q].description) {
        isValidateQuestion = false;
        index_question = q;
        break;
      }
      question_clone[q].is_valid_q = true;
    }

    if (isValidateQuestion === false) {
      question_clone[index_question].is_valid_q = false;
      toast.error(`Not empty description for Question ${index_question + 1}`);
      setQuestion(question_clone);
      return;
    }

    // validate answer
    for (let q = 0; q < question_clone.length; q++) {
      count_correct = 0;
      for (let a = 0; a < question_clone[q].answers.length; a++) {
        if (!question_clone[q].answers[a].description) {
          isValidate = false;
          index_answer = a;
          break;
        }
        question_clone[q].answers[a].is_valid = true;

        if (question_clone[q].answers[a].isCorrect == true) {
          question_clone[q].is_valid_a = true;
          count_correct += 1;
        }
      }
      if (isValidate == false || +count_correct === 0) {
        index_question = q;
        break;
      }
    }

    if (isValidate == false) {
      question_clone[index_question].answers[index_answer].is_valid = false;
      toast.error(`Not empty answer ${index_answer + 1} at Question ${index_question + 1}`);
      setQuestion(question_clone);
      return;
    }

    if (count_correct === 0) {
      question_clone[index_question].is_valid_a = false;
      toast.warn(`Please choose the correct answer at Question ${index_question + 1}`);
      setQuestion(question_clone);
      return;
    }

    // Submit question
    let data = _.cloneDeep(question);
    for (let i = 0; i < data.length; i++) {
      if (data[i].imageFile) {
        data[i].imageFile = await toBase64(data[i].imageFile);
      }

      data[i] = _.omit(data[i], ['is_valid_a', ['is_valid_q']]);
      data[i].answers = _.map(data[i].answers, answer => _.omit(answer, ['is_valid']));
    }

    let res = await postUpsertQA({
      quizId: selectedQuiz.value,
      questions: data,
    })

    // console.log(">>check res: ", res);
    if (res && res.EC == 0) {
      toast.success(res.EM);
      fetchQuizWithQA();
    }
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });


  const handleShowPreview = (file, title_image) => {
    setDataImage({
      title: title_image,
      url: URL.createObjectURL(file)
    })
    setIsPreviewImage(true);
  }

  // console.log("data question: ", question);
  return (
    <div className="qa-container">
      <div className="add-new-question">
        <div className="col-7 form-group select-quiz">
          <label className="mb-2">Select Quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
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
                    // id={item.id}
                    type="type"
                    className={`form-control ${item.is_valid_q && item.is_valid_a ? '' : 'is-invalid'}`}
                    placeholder="name@example.com"
                    value={item.description}
                    onChange={(event) => handleOnChange('QUESTION', item.id, event.target.value)}
                  />
                  <label>Question {index + 1}'s Description</label>
                  {item.is_valid_q === false &&
                    <div id={`${item.id}Feedback`} className="invalid-feedback">
                      Please enter description for this question!
                    </div>
                  }
                  {item.is_valid_a === false &&
                    <div id={`${item.id}Feedback`} className="invalid-feedback">
                      Please choose correct answer for this question!
                    </div>
                  }
                </div>
                <div className="group-upload" >
                  <label className="title" htmlFor={`${item.id}`}>
                    <MdAddPhotoAlternate className="icon-upload" /> Upload Image: &nbsp;
                  </label>
                  <input
                    id={`${item.id}`}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(event) => handleOnChangeFile(item.id, event)}
                  />
                  <span>
                    {item.imageFile ?
                      <span
                        className="name-img-preview"
                        onClick={() => handleShowPreview(item.imageFile, item.imageName)}> {item.imageName}</span>
                      :
                      '0 file was uploaded'}
                  </span>
                </div>
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
                          id={a.id}
                          type="type"
                          className={`form-control ${a.is_valid ? '' : 'is-invalid'}`}
                          placeholder="Answer 1"
                          value={a.description}
                          onChange={(event) => handleAnswerQuestion('ANSWER', item.id, a.id, event.target.value)}
                          aria-describedby={`${a.id}Feedback`}
                        />
                        <label>Answer {index + 1}</label>
                        {a.is_valid === false &&
                          <div id={`${a.id}Feedback`} className="invalid-feedback">
                            Please enter this answer description!
                          </div>
                        }
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

      {isPreviewImage === true &&
        <Lightbox
          image={dataImage.url}
          title={dataImage.title}
          onClose={() => setIsPreviewImage(false)}
        >
        </Lightbox>
      }
    </div>
  )
}
export default QuizQA;