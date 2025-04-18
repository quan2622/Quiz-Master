import AxiosInstance from "../ultis/axiosInstance";

const postCreateUser = (email, passWord, userName, role, avt) => {
  const data = new FormData();
  data.append('email', email);
  data.append('password', passWord);
  data.append('username', userName);
  data.append('role', role);
  data.append('userImage', avt);
  return AxiosInstance.post('api/v1/participant', data)
}

const getAllUser = () => {
  return AxiosInstance.get('api/v1/participant/all')
}


export {
  postCreateUser,
  getAllUser,
}