import { createStore, combineReducers } from "redux";

import { todosReducer, countReducer } from "./reducers";

const reducer = combineReducers({
  todos: todosReducer,
  count: countReducer,
});

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
