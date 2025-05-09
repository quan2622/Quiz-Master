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

const updateQuiz = (quizId, name, description, difficulty, quizImage) => {
  const data = new FormData();
  data.append('id', quizId);
  data.append('description', description);
  data.append('name', name);
  data.append('difficulty', difficulty);
  data.append('quizImage', quizImage);
  return AxiosInstance.put('api/v1/quiz', data);
}

const deleteQuiz = (quizId) => {
  return AxiosInstance.delete(`api/v1/quiz/${quizId}`)
}

const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append('quiz_id', quiz_id);
  data.append('description', description);
  data.append('questionImage', questionImage);
  return AxiosInstance.post('api/v1/question', data);
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
  return AxiosInstance.post('api/v1/answer', { description, correct_answer, question_id, });
}

const postAssignQuizToUser = (quizId, userId) => {
  return AxiosInstance.post('api/v1/quiz-assign-to-user', { quizId, userId });
}

const getQuizWithQuestionAnswer = (quizId) => {
  return AxiosInstance.get(`api/v1/quiz-with-qa/${quizId}`);
}

const postUpsertQA = (data) => {
  return AxiosInstance.post('api/v1/quiz-upsert-qa', { ...data });
}

const getHistoryQuizUser = () => {
  return AxiosInstance.get('api/v1/history');
}

export {
  getQuizByUser,
  getDataQuiz,
  submitQuiz,
  addNewQuiz,
  getDataQuizTable,
  updateQuiz,
  deleteQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  postAssignQuizToUser,
  getQuizWithQuestionAnswer,
  postUpsertQA,
  getHistoryQuizUser,
}