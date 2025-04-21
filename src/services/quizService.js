import AxiosInstance from "../ultis/axiosInstance"

const getQuizByUser = () => {
  return AxiosInstance.get('api/v1/quiz-by-participant');
}

const getDataQuiz = (quizId) => {
  return AxiosInstance.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}

export {
  getQuizByUser,
  getDataQuiz,
}