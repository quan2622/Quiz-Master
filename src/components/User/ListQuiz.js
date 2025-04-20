import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/quizService";
import "./ListQuiz.scss"

const ListQuiz = (props) => {
  const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    let data = await getQuizByUser();
    if (data && data.EC == 0) {
      setArrQuiz(data.DT);
    }
  }

  return (
    <div className="list-quiz-container container">
      <div className="row">

        {arrQuiz && arrQuiz.length > 0 && arrQuiz.map((quiz, index) => {
          return (
            <div className="card col-md-3 mx-2" style={{ width: "18rem" }} key={`${index}-quiz`}>
              <img src={`data:image/jpeg;base64, ${quiz.image}`} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{quiz.description}</p>
                <button className="btn btn-primary">Start now</button>
              </div>
            </div>
          )
        })}

        {arrQuiz && arrQuiz.length == 0 &&
          <div>You don't have any Quiz now...</div>
        }

      </div>
    </div>
  )
}

export default ListQuiz;