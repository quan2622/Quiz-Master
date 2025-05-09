import { useEffect, useState } from "react";
import { data, NavLink, useLocation, useParams } from "react-router-dom";
import { getDataQuiz, submitQuiz } from "../../services/quizService";
import _ from "lodash";
import "./DetailQuiz.scss"
import Question from "./Question";
import { toast } from "react-toastify";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import { Breadcrumb } from "react-bootstrap";
import PerfectScrollbar from 'react-perfect-scrollbar'


const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const quiz_title = location?.state?.quiz_title;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);

  useEffect(() => {
    FetchQuestions();
  }, [quizId]);

  const FetchQuestions = async () => {
    const questions = await getDataQuiz(quizId);
    if (questions && questions.EC == 0) {
      let raw = questions.DT;
      let new_raw = _.chain(raw)
        // Group the elements of Array based on `id` property
        .groupBy("id")
        // `key` is group's name (id), `value` is the array of objects
        .map((value, key) => {
          let answer = [];
          let question_description, question_image = null;
          value.forEach((item, index) => {
            if (index == 0) {
              question_description = item.description;
              question_image = item.image;
            }
            item.answers.isSelected = false;
            item.answers.isCorrected = false;
            answer.push(item.answers);
          });
          answer = _.orderBy(answer, ['id'], ['asc']);

          return {
            questionId: key,
            answer,
            question_description,
            question_image,
          }
        })
        .value()
      // console.log("check_new data: ", new_raw);
      setDataQuiz(new_raw);
    }
  }

  const handlePrev = () => {
    if (currentQuestion - 1 < 0) return;
    setCurrentQuestion(currentQuestion - 1)
  }
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > currentQuestion + 1)
      setCurrentQuestion(currentQuestion + 1)
  }

  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(item => +item.questionId === +questionId);
    if (question && question.answer) {
      question.answer = question.answer.map((item, index) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      })
    }
    let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }

  }

  const handleFinishQuiz = async () => {
    // console.log("check quiz submit: ", dataQuiz);
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach(item => {
        let question = {
          questionId: +item.questionId,
          userAnswerId: [],
        };

        item.answer.forEach(item => {
          if (item.isSelected) question.userAnswerId.push(item.id);
        })
        payload.answers.push(question);
      })
    }

    // Submit quiz API
    const res = await submitQuiz(payload);
    if (res.EC === 0) {
      toast.success(res.EM);
      setIsSubmitQuiz(true)
      console.log("data respone: ", res);
      setDataModal(res.DT);
      setShowResult(true);

      // Show correct answers
      if (res.DT && res.DT.quizData) {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let quizData_answer = res.DT.quizData;
        console.log('data quiz: ', dataQuiz, ' - data answer: ', quizData_answer);
        for (let q of quizData_answer) {
          for (let i = 0; i < dataQuizClone.length; i++) {
            if (q.questionId === +dataQuizClone[i].questionId) {
              let new_answers = [];

              for (let j = 0; j < dataQuizClone[i].answer.length; j++) {
                let s = q.systemAnswers.find(item => item.id === dataQuizClone[i].answer[j].id);
                if (s) {
                  dataQuizClone[i].answer[j].isCorrected = true;
                }
                new_answers.push(dataQuizClone[i].answer[j]);
              }
              dataQuizClone[i].answer = new_answers;
            }
          }
        }
        setDataQuiz(dataQuizClone);
      }
    } else {
      toast.error(res.EM);
    }
  }
  console.log('check data quiz: ', dataQuiz);

  return (
    <>
      <div className="detail-quiz-container">
        {/* <div className="left-content"> */}
        <PerfectScrollbar className="left-content">
          <Breadcrumb className="breadcrumb-header">
            <NavLink to='/' className={"breadcrumb-item"}>Home</NavLink>
            <NavLink to='/users' className={"breadcrumb-item"}>Users</NavLink>
            <Breadcrumb.Item active>Quiz Submission</Breadcrumb.Item>
          </Breadcrumb>
          <div className="title">
            Quiz {quizId}: {quiz_title}
          </div>
          <div className="body">
            <div className="question-body">
              <div className="question-content">
                <Question
                  data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuestion] : {}}
                  index={currentQuestion}
                  handleCheckbox={handleCheckbox}
                  isSubmitQuiz={isSubmitQuiz}
                />
              </div>
            </div>
            <div className="footer">
              <button className={`btn-prev ${currentQuestion == 0 ? "disabled" : ""}`} onClick={() => handlePrev()}>Prev</button>
              <button className={`btn-next ${currentQuestion == dataQuiz.length - 1 ? "disabled" : ""}`} onClick={() => handleNext()}>Next</button>
            </div>
          </div>
        </PerfectScrollbar>
        {/* </div> */}
        <div className="right-content">
          <RightContent
            dataQuiz={dataQuiz}
            handleFinishQuiz={handleFinishQuiz}
            setQuestionIndex={setCurrentQuestion}
            currentQuestion={currentQuestion}
            isSubmitQuiz={isSubmitQuiz}
          />
        </div>
        <ModalResult
          show={showResult}
          setShow={setShowResult}
          dataModal={dataModal}
        />
      </div>
    </>
  )
}

export default DetailQuiz;