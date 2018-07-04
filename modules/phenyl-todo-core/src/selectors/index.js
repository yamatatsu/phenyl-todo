// @flow
import type { State, User } from "../types";

function getUserData(state: State) {
  const { session, entities } = state.phenyl;
  if (session && entities.user) {
    return entities.user[session.userId];
  }
  return null;
}
export function getUser(state: State): ?User {
  const userData = getUserData(state);
  return userData && userData.origin;
}

export function getUserVersionId(state: State): string {
  const userData = getUserData(state);
  return userData && userData.versionId;
}

export function getSession(state: State): ?Patient {
  return state.phenyl.session;
}
