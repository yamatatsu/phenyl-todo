// @flow
import NavigationService from "../app/navigation-service";

const ACTION_PARAMS_MAP = {
  LOGIN_BUTTON_CLICKED: "TodoList",
};

const actionToParams = action => {
  const nav = ACTION_PARAMS_MAP[action.type];
  if (!nav) {
    return null;
  } else if (typeof nav === "function") {
    nav(action);
  }
  return nav;
};

const meddleware = store => next => action => {
  const result = next(action);

  const params = actionToParams(action);
  params && NavigationService.navigate(params);

  return result;
};
export default meddleware;
