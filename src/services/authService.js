import AxiosInstance from "../ultis/axiosInstance"

const LoginAccount = (email, password) => {
  return AxiosInstance.post("api/v1/login", { email, password });
}

export {
  LoginAccount,
}