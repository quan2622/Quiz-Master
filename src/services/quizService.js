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

const addNewQuiz = (name, description, difficulty, quizImage) => {
  const data = new FormData();
  data.append('description', description);
  data.append('name', name);
  data.append('difficulty', difficulty);
  data.append('quizImage', quizImage);
  return AxiosInstance.post('api/v1/quiz', data)
}

const getDataQuizTable = () => {
  return AxiosInstance.get('api/v1/quiz/all');
}

export {
  getQuizByUser,
  getDataQuiz,
  submitQuiz,
  addNewQuiz,
  getDataQuizTable,
}