import { createStore as createReduxStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const reducer = () => ({});
export const createStore = (middlewares = []) =>
  createReduxStore(reducer, applyMiddleware(thunk, logger, ...middlewares));
