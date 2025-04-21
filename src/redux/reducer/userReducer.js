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
          access_token: action?.payload?.access_token,
          refresh_token: action?.payload?.refresh_token,
          username: action?.payload?.username,
          email: action?.payload?.email,
          image: action?.payload?.image,
          role: action?.payload?.role,
        },
        isAuthencated: true,
      };

    default: return state;
  }
};

export default userReducer;