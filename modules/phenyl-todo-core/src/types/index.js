// @flow
export const LOGIN_REQUESTED = "LOGIN_REQUESTED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export type UnvalidatedUser = {
  email: ?string,
  password: ?string,
};
export type ValidatedUser = {
  email: string,
  password: string,
};
export type User = ValidatedUser & {
  id: string,
};

export type LoginRequested = {
  type: typeof LOGIN_REQUESTED,
  payload: { user: ValidatedUser },
};
export type LoginSuccess = {
  type: typeof LOGIN_SUCCESS,
  payload: { user: User },
};

export type Action = LoginRequested | LoginSuccess;

export type GetState = () => Object;

export type ThunkAction = (
  dispatch: (action: Action | ThunkAction) => void | Promise<void>,
  getState: GetState
) => void | Promise<void>;

export type Dispatch = (action: Action | ThunkAction) => void | Promise<void>;
