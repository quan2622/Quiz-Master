import { FETCH_USER_LOGIN } from "../action/userAction";

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
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          username: action?.payload?.DT?.username,
          email: action?.payload?.DT?.email,
          image: action?.payload?.DT?.image,
          role: action?.payload?.DT?.role,
        },
        isAuthencated: true,
      };

    default: return state;
  }
};

export default userReducer;