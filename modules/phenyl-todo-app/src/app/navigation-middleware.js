// @flow
import { LOGIN_REQUESTED } from "phenyl-todo-core";
import type { Action } from "phenyl-todo-core";
import NavigationService from "../app/navigation-service";

const ACTION_PARAMS_MAP = {
  [LOGIN_REQUESTED]: "TodoList",
};

const actionToParams = (action: Action) => {
  const nav = ACTION_PARAMS_MAP[action.type];
  if (!nav) {
    return null;
  } else if (typeof nav === "function") {
    nav(action);
  }
  return nav;
};

const meddleware = store => next => (action: Action) => {
  const result = next(action);

  const params = actionToParams(action);
  params && NavigationService.navigate(params);

  return result;
};
export default meddleware;
