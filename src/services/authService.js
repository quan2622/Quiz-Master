import AxiosInstance from "../ultis/axiosInstance"

const LoginAccount = (email, password) => {
  return AxiosInstance.post("api/v1/login", { email, password, delay: 1000 });
}

const SignupAccount = (dataUser) => {
  return AxiosInstance.post("api/v1/register", dataUser);
}

const LogOut = (email, refresh_token) => {
  return AxiosInstance.post('api/v1/logout', { email, refresh_token });
}

export {
  LoginAccount,
  SignupAccount,
  LogOut,
}