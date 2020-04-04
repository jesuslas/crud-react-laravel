import { UserStatus } from "../actions/user";

const stringUser = localStorage.user || null;
const initialState = JSON.parse(stringUser);

const user = (state = initialState, action) => {
  switch (action.type) {
    case UserStatus.SIGN_IN:
      const user = { ...state, ...action.user };
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    case UserStatus.LOG_OUT:
      localStorage.removeItem("user");
      return null;
    default:
      return state;
  }
};

export default user;
