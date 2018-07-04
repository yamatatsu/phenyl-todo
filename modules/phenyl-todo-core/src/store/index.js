// @flow
import {
  combineReducers,
  createStore as createReduxStore,
  applyMiddleware,
} from "redux";
import phenylReducer, { createMiddleware } from "phenyl-redux";
import PhenylHttpClient from "phenyl-http-client";
import thunk from "redux-thunk";
import logger from "redux-logger";

const httpClient = new PhenylHttpClient({ url: "http://localhost:8888" });

const reducer = combineReducers({
  phenyl: phenylReducer,
});

const createStore = (...middlewares) =>
  createReduxStore(
    reducer,
    applyMiddleware(
      thunk,
      ...middlewares,
      createMiddleware({
        client: httpClient,
        storeKey: "phenyl",
      }),
      logger
    )
  );

export default createStore;
