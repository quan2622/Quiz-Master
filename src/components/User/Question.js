import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
  const { data, index, isSubmitQuiz } = props;
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  const handleShowPreview = () => {
    setIsPreviewImage(true);
  }


  if (_.isEmpty(data)) {
    return (<></>)
  }

  const handleCheckbox = (event, aId, qId) => {
    props.handleCheckbox(+aId, +qId);
  }

  const handleCorrectAnswer = (answer) => {
    if (answer.isSelected === true) {
      if (answer.isCorrected === false)
        return 'isInCorrect'
    }
    if (answer.isCorrected === true) {
      return 'isCorrect'
    }
  }

  return (
    <>
      <div className="question">
        <span>Question {index + 1}:	&nbsp;</span> {data.question_description} ?
      </div>
      {data.question_image &&
        <div className="image-container">
          <img src={`data:image/jpeg;base64, ${data.question_image}`} alt="question-image" onClick={() => handleShowPreview()} />
          {isPreviewImage === true &&
            <Lightbox
              image={`data:image/jpeg;base64, ${data.question_image}`}
              title={'question_image'}
              onClose={() => setIsPreviewImage(false)}
            >
            </Lightbox>
          }
        </div>
      }
      <div className="answer">
        {data.answer && data.answer.length > 0 &&
          data.answer.map((item, index) => {
            return (
              <label className={`item  ${isSubmitQuiz === true && handleCorrectAnswer(item)}`} key={`answer-${item.id}`} htmlFor={index}>
                <input className="form-check-input" type="checkbox" id={index} onChange={(e) => handleCheckbox(e, item.id, data.questionId)} checked={item.isSelected} disabled={isSubmitQuiz ? true : false} />
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