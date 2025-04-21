import { useEffect, useState } from "react";
import { data, useLocation, useParams } from "react-router-dom";
import { getDataQuiz } from "../../services/quizService";
import _ from "lodash";
import "./DetailQuiz.scss"
import Question from "./Question";

const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;
  const quiz_title = location?.state?.quiz_title;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
          const answer = [];
          let question_description, question_image = null;
          value.forEach((item, index) => {
            if (index == 0) {
              question_description = item.description;
              question_image = item.image;
            }
            answer.push(item.answers);
          });
          return {
            questionId: key,
            answer,
            question_description,
            question_image,
          }
        })
        .value()
      console.log("check_new data: ", new_raw);
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

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          Quiz {quizId}: {quiz_title}
        </div>
        <div className="body">
          <div className="question-body">
            <div className="question-content">
              <Question data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[currentQuestion] : {}} index={currentQuestion} />
            </div>
          </div>
          <div className="footer">
            <button className={`btn-prev ${currentQuestion == 0 ? "disabled" : ""}`} onClick={() => handlePrev()}>Prev</button>
            <button className="btn-next" onClick={() => handleNext()}>Next</button>
          </div>
        </div>
      </div>
      <div className="right-content">
        <div className="section-1">
          <span className="title-section">Time left</span>
          <div className="clock-container">
            1:00:00
          </div>
        </div>
        <hr />
        <div className="section-2">
          <span className="title-section">List question</span>
          <div className="question-container">
            <div className="question-item">
              1
            </div>
            <div className="question-item selected">
              2
            </div>
            <div className="question-item">
              3
            </div>
            <div className="question-item">
              3
            </div>
            <div className="question-item">
              3
            </div>
            <div className="question-item">
              3
            </div>
            <div className="question-item">
              3
            </div>
            <div className="question-item">
              3
            </div>
          </div>
        </div>
        <hr />
        <div className="section-3">
          <button>Submit quiz</button>
        </div>
      </div>
    </div>
  )
}

export default DetailQuiz;