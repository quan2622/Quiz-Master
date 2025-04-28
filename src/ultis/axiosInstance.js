import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";
import { refresh_token } from "../services/authService";
import { toast } from "react-toastify";
import { doRefresh } from "../redux/action/userAction";
import axiosRetry from 'axios-retry';

NProgress.configure({
  showSpinner: false,
  easing: 'ease',
  trickleSpeed: 50,
})

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8081/',
});

// KIỂM TRA LỖI ACCESS_TOKEN KHÔNG THỂ GET API
axiosRetry(AxiosInstance, {
  retries: 1,
  retryCondition: async (error) => {
    // Kiểm tra điều kiện để retry
    return error.response && error.response.data.EC === -1;
  },
  onRetry: async (retryCount, error, requestConfig) => {
    if (error.response && error.response.data && error.response.data.EC === -999) {
      const data_user = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user || "{}");
      let data_refresh = {
        email: data_user?.account.email,
        refresh_token: data_user?.account.refresh_token
      };
      await handleRefreshToken(data_refresh);
    }
  }
})

// CALL API TO REFRESH TOKEN
const handleRefreshToken = async (data_refresh) => {
  const new_data_user = await refresh_token(data_refresh);
  // console.log('check data refresh: ', new_data_user);
  if (new_data_user && new_data_user.EC === 0) {
    // update data in redux
    store.dispatch(doRefresh(new_data_user.DT));
    toast.success(new_data_user.EM);
  } else {
    toast.error(new_data_user.EM);
    window.location.href = '/login';
  }
}

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
  // token expired
  // console.log('check error:', error.response.data);
  // KHÔNG DÙNG THƯ VIỆN REACT-RETRY
  // if (error.response.data && error.response.data.EC === -999) {
  //   const data_user = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user || "{}");
  //   let data_refresh = {
  //     email: data_user?.account.email,
  //     refresh_token: data_user?.account.refresh_token
  //   };
  //   // console.log("check data: ", data_refresh);
  //   handleRefreshToken(data_refresh);
  // }
  // KHÔNG DÙNG THƯ VIỆN REACT-RETRY

  // console.log("error: ", error.response.data);
  return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});

export default AxiosInstance