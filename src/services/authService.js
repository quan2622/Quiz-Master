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

const refresh_token = (data) => {
  return AxiosInstance.post('api/v1/refresh-token', data);
}

export {
  LoginAccount,
  SignupAccount,
  LogOut,
  refresh_token,
}