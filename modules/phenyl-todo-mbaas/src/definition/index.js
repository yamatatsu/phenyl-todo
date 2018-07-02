// @flow
import type {
  EntityClient,
  UserDefinitions,
  EntityDefinitions,
  CustomCommandDefinitions,
} from "phenyl-interfaces";
import { StandardEntityDefinition } from "phenyl-standards";
import type { EntityMap } from "../types";
import UserDefinition from "./user-definition";
import RegisterUserDefinition from "./register-user-definition";

export const createUserDefinitions = (
  entityClient: EntityClient<EntityMap>
): UserDefinitions => ({
  user: new UserDefinition(entityClient),
});

class TodoDefinition extends StandardEntityDefinition {}
export const createNonUserDefinitions = (
  entityClient: EntityClient<EntityMap>
): EntityDefinitions => ({
  todo: new TodoDefinition({}),
});

export const createCustomCommandDefinitions = (
  entityClient: EntityClient<EntityMap>
): CustomCommandDefinitions<any> => ({
  registerUser: new RegisterUserDefinition(entityClient),
});
