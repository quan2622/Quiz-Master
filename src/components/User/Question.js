import _ from "lodash";
import { useEffect } from "react";

const Question = (props) => {
  const { data, index } = props;

  if (_.isEmpty(data)) {
    return (<></>)
  }
  // useEffect(() => {
  // }, [data]);
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
              <label className="item" key={`answer-${item.id}`} for={index}>
                <input class="form-check-input" type="checkbox" value="" id={index} />
                <label class="form-check-label" for={index}>
                  {item.description}
                </label>
              </label>
            )
          })
        }
        {/* <div className="item">B. dap an 2</div>
        <div className="item">C. dap an 3</div>
        <div className="item">D. dap an 4</div> */}
      </div>
    </>
  )
}

export default Question;