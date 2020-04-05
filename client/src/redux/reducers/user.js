import { UserStatus } from "../actions/user";

const stringUser = sessionStorage.user || null;
const initialState = JSON.parse(stringUser);

const user = (state = initialState, action) => {
  let expirationDate = new Date(new Date().getTime() + 60000 * 1);
  switch (action.type) {
    case UserStatus.SIGN_IN:
      const user = { ...state, ...action.user, expirationDate };
      sessionStorage.setItem("user", JSON.stringify(user));
      return user;
    case UserStatus.LOG_OUT:
      sessionStorage.removeItem("user");
      return null;
    default:
      return state;
  }
};

export default user;
