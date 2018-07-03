// @flow
import { createStore as createReduxStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const reducer = () => ({});
const createStore = (...middlewares) =>
  createReduxStore(reducer, applyMiddleware(thunk, logger, ...middlewares));

export default createStore;
