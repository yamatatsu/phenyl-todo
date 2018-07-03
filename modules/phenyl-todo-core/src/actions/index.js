// @flow
import { LOGIN_REQUESTED } from "../types";
import type { ThunkAction } from "../types";

export const loginRequested = (
  email: string,
  password: string
): ThunkAction => dispatch => {
  dispatch({ type: LOGIN_REQUESTED, payload: { email, password } });
};
