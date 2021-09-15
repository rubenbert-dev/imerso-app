import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from "./reducers";

let middleware = [
  thunkMiddleware,
  routerMiddleware(browserHistory)
].filter(Boolean);

let createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

const configureStore = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default configureStore;
