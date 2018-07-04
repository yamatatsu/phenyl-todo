// @flow
import { actions as phenylReduxActions } from "phenyl-redux";
import { LOGIN_REQUESTED, LOGIN_SUCCESS } from "../types";
import type { ThunkAction } from "../types";

import { getUser, getUserVersionId, getSession } from "../selectors";

export const loginRequested = (
  email: string,
  password: string
): ThunkAction => async (dispatch, getState) => {
  dispatch({ type: LOGIN_REQUESTED, payload: { email, password } });
  await dispatch(
    phenylReduxActions.login({
      entityName: "user",
      credentials: { email, password },
    })
  );
  const state = getState();
  const user = getUser(state);
  const versionId = getUserVersionId(state);
  const session = getSession(state);
  if (!user || !versionId || !session) {
    throw new Error(
      "データ不整合が発生しました:" +
        JSON.stringify({ user, versionId, session })
    );
  }
  await dispatch(phenylReduxActions.follow("user", user, versionId));

  dispatch({
    type: LOGIN_SUCCESS,
    payload: { user },
  });
};
