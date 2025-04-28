import { FETCH_USER_LOGIN, USER_LOGOUT_SUCCESS, USER_REFRESH_TOKEN, USER_UPDATE_PROFILE } from "../action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: '',
    refresh_token: '',
    username: '',
    email: '',
    image: '',
    role: '',
  },
  isAuthencated: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        account: {
          access_token: action?.payload?.access_token,
          refresh_token: action?.payload?.refresh_token,
          username: action?.payload?.username,
          email: action?.payload?.email,
          image: action?.payload?.image,
          role: action?.payload?.role,
        },
        isAuthencated: true,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        account: {
          access_token: '',
          refresh_token: '',
          username: '',
          email: '',
          image: '',
          role: '',
        },
        isAuthencated: false,
      };

    case USER_REFRESH_TOKEN:
      console.log('redux check payload: ', action?.payload);
      return {
        ...state,
        account: {
          ...state.account,
          access_token: action?.payload?.access_token,
          refresh_token: action?.payload?.refresh_token,
        }
      };

    case USER_UPDATE_PROFILE:
      return {
        ...state,
        account: {
          ...state.account,
          username: action?.payload?.username,
          image: action?.payload?.image,
        }
      };

    default: return state;
  }
};

export default userReducer;