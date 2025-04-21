import _ from "lodash";

const Question = (props) => {
  const { data, index } = props;

  if (_.isEmpty(data)) {
    return (<></>)
  }

  const handleCheckbox = (event, aId, qId) => {
    props.handleCheckbox(+aId, +qId);
  }
  return (
    <>
      <div className="question">
        <span>Question {index + 1}:	&nbsp;</span> {data.question_description} ?
      </div>
      {data.question_image &&
        <div className="image-container">
          <img src={`data:image/jpeg;base64, ${data.question_image}`} alt="question-image" />
        </div>
      }
      <div className="answer">
        {data.answer && data.answer.length > 0 &&
          data.answer.map((item, index) => {
            return (
              <label className="item" key={`answer-${item.id}`} htmlFor={index}>
                <input className="form-check-input" type="checkbox" id={index} onChange={(e) => handleCheckbox(e, item.id, data.questionId)} checked={item.isSelected} />
                <label className="form-check-label" htmlFor={index}>
                  {item.description}
                </label>
              </label>
            )
          })
        }
      </div>
    </>
  )
}

export default Question;