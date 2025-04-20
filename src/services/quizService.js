import AxiosInstance from "../ultis/axiosInstance"

const getQuizByUser = () => {
  return AxiosInstance.get('api/v1/quiz-by-participant');
}

export {
  getQuizByUser,
}