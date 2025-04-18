import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8081/',
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
AxiosInstance.interceptors.response.use(function (response) {
  // console.log(">> intercepter: ", response)
  return response && response.data ? response.data : response;
}, function (error) {
  return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default AxiosInstance