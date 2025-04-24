const RightContent = (props) => {
  const { dataQuiz, handleFinishQuiz } = props;
  console.log('check data quiz: ', dataQuiz);



  return (
    <div className="right-container">
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
          {dataQuiz && dataQuiz.length > 0 &&
            dataQuiz.map((item, index) => {
              return (
                <div className="question-item" key={`a_index-${index}`}>
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