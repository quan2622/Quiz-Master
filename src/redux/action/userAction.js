export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN';
export const USER_UPDATE_PROFILE = 'USER_UPDATE_PROFILE';

export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN,
    payload: data,
  }
}

export const doLogout = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  }
}

export const doRefresh = (data) => {
  return {
    type: USER_REFRESH_TOKEN,
    payload: data,
  }
}

export const doUpdateProfile = (data) => {
  return {
    type: USER_UPDATE_PROFILE,
    payload: data,
  }
}
