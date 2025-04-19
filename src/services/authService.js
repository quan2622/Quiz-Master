import AxiosInstance from "../ultis/axiosInstance"

const LoginAccount = (email, password) => {
  return AxiosInstance.post("api/v1/login", { email, password });
}

const SignupAccount = (dataUser) => {
  return AxiosInstance.post("api/v1/register", dataUser);
}
export {
  LoginAccount,
  SignupAccount,
}