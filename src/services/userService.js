import { data } from "react-router-dom";
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

const getAllUserWithPaginate = (page, limit) => {
  return AxiosInstance.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const putUpdateUser = (id, userName, role, avt) => {
  const data = new FormData();
  data.append('id', id);
  data.append('username', userName);
  data.append('role', role);
  data.append('userImage', avt);
  return AxiosInstance.put('api/v1/participant', data)
}

const deleteUser = (userId) => {
  return AxiosInstance.delete('api/v1/participant', { data: { id: userId } })
}

export {
  postCreateUser,
  getAllUser,
  getAllUserWithPaginate,
  putUpdateUser,
  deleteUser,
}