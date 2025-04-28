import { useEffect } from "react";
import { useState } from "react";

const CountDown = (props) => {
  const [duration, setDuration] = useState(300);
  useEffect(() => {
    if (duration === 0) {
      props.onTimeUp();
      return;
    }
    if (!props.isSubmitQuiz) {
      const timer = setInterval(() => {
        setDuration(duration - 1);
      }, 1000);
      return () => {
        // clean up
        clearInterval(timer);
      }
    }
  }, [duration]);

  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10)
    const hours = Math.floor(sec_num / 3600)
    const minutes = Math.floor(sec_num / 60) % 60
    const seconds = sec_num % 60

    return [hours, minutes, seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v, i) => v !== "00" || i > 0)
      .join(":")
  }

  return (
    <div className="section-1">
      <span className="title-section">Time left</span>
      <div className="clock-container">
        {toHHMMSS(duration)}
      </div>
    </div>
  )
}

export default CountDown;