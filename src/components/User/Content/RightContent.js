import { useEffect, useLayoutEffect, useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
  const refItem = useRef([]);

  const { dataQuiz, handleFinishQuiz, setQuestionIndex, currentQuestion } = props;
  // console.log('check data quiz: ', dataQuiz);

  const onTimeUp = () => {
    handleFinishQuiz();
  }

  const getQuestionClass = (question, index) => {
    let init_class = 'question-item';
    if (index === currentQuestion) {
      init_class = `${init_class} clicked`;
    }
    if (question && question.answer.length > 0) {
      let isAnswered = question.answer.some(a => a.isSelected === true);
      // console.log('check question', question, ' - ', isAnswered);
      if (isAnswered) {
        return `${init_class} selected`
      }
    }
    return init_class;
  }

  const handleSelectQuestion = (currentQuestion) => {
    // console.log('check ref: ', refItem.current);
    // DÙNG REF ĐỂ QUẢN LÝ TRẠNG THÁI SELECT CÂU HỎI PHẦN RIGHT CONTENT
    // if (refItem.current && refItem.current[currentQuestion]) {
    //   refItem.current.forEach(option => option.classList.remove('clicked'));
    //   refItem.current[currentQuestion]?.classList.add('clicked');
    // }
    setQuestionIndex(currentQuestion);
  }

  return (
    <div className="right-container">
      <CountDown onTimeUp={onTimeUp} />
      <hr />
      <div className="section-2">
        <span className="title-section">List question</span>
        <div className="question-container">
          {dataQuiz && dataQuiz.length > 0 &&
            dataQuiz.map((item, index) => {
              return (
                <div
                  className={getQuestionClass(item, index)}
                  key={`a_index-${index}`}
                  onClick={() => handleSelectQuestion(index)}
                  ref={(element) => refItem.current[index] = element}
                >
                  {index + 1}
                </div>
              )
            })
          }
        </div>
      </div>
      <hr />
      <div className="section-3">
        <button onClick={() => handleFinishQuiz()}>Submit quiz</button>
      </div>
    </div>
  )
}

export default RightContent;