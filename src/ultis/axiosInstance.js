import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";

NProgress.configure({
  showSpinner: false,
  easing: 'ease',
  trickleSpeed: 50,
})

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8081/',
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  const access_token = store?.getState()?.user?.account?.access_token;
  config.headers.Authorization = `Bearer ${access_token}`;
  NProgress.start();
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
AxiosInstance.interceptors.response.use(function (response) {
  // console.log(">> intercepter: ", response)
  NProgress.done();
  return response && response.data ? response.data : response;
}, function (error) {
  NProgress.done();
  return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default AxiosInstance