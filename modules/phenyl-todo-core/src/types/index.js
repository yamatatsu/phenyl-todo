// @flow
export const LOGIN_REQUESTED = "LOGIN_REQUESTED";

export type LoginRequested = {
  type: typeof LOGIN_REQUESTED,
  payload: { email: string, password: string },
};

export type Action = LoginRequested;

export type GetState = () => Object;

export type ThunkAction = (
  dispatch: (action: Action | ThunkAction) => void | Promise<void>,
  getState: GetState
) => void | Promise<void>;

export type Dispatch = (action: Action | ThunkAction) => void | Promise<void>;
