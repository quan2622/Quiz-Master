import AxiosInstance from "../ultis/axiosInstance"

const getOverview = () => {
  return AxiosInstance.get('api/v1/overview');
}

export {
  getOverview,
}