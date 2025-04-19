export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';

export const doLogin = (data) => {
  return {
    type: FETCH_USER_LOGIN,
    payload: data,
  }
}
