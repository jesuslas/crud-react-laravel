import { combineReducers, createStore } from "redux";
import user from "./reducers/user";

const reducer = combineReducers({
  user
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
