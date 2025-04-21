import AxiosInstance from "../ultis/axiosInstance"

const getQuizByUser = () => {
  return AxiosInstance.get('api/v1/quiz-by-participant');
}

const getDataQuiz = (quizId) => {
  return AxiosInstance.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}


const submitQuiz = (payload) => {
  return AxiosInstance.post('api/v1/quiz-submit', { ...payload });
}
export {
  getQuizByUser,
  getDataQuiz,
  submitQuiz,
}