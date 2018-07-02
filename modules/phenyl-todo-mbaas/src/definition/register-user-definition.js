// @flow
import type {
  CustomCommandDefinition,
  CustomCommand,
  CustomCommandResult,
  Session,
  EntityClient,
} from "phenyl-interfaces";
import crypt from "power-crypt";
import { createServerError } from "phenyl-utils";

import type { RegisterUserParams, EntityMap } from "../types";

// FIXME: 固くする
type N = any;
type Response = {};

export default class RegisterUserDefinition
  implements CustomCommandDefinition<N, RegisterUserParams, Response> {
  entityClient: EntityClient<EntityMap>;

  constructor(entityClient: EntityClient<EntityMap>) {
    this.entityClient = entityClient;
  }

  async authorization(
    command: CustomCommand<N, RegisterUserParams>,
    session: ?Session
  ): Promise<boolean> {
    return true;
  }

  async validation(
    command: CustomCommand<N, RegisterUserParams>,
    session: ?Session
  ): Promise<void> {
    if (!command.params) {
      throw createServerError("params must be required");
    }
    const { email } = command.params;

    try {
      const result = await this.entityClient.findOne({
        entityName: "user",
        where: { email },
      });
      if (result.entity) {
        throw new Error("Conflicted email");
      }
    } catch (error) {
      throw createServerError(error);
    }
  }

  async execution(
    command: CustomCommand<N, RegisterUserParams>,
    session: ?Session
  ): Promise<CustomCommandResult<Response>> {
    try {
      const params = command.params;

      params.password = crypt(params.password);

      const insertedUser = await this.entityClient.insertAndGet({
        entityName: "user",
        value: params,
      });
      delete insertedUser.entity.password; // FIXME: directClient使ってパスワードの扱いを隠蔽する

      return { ok: 1, result: { user: insertedUser } };
    } catch (error) {
      throw createServerError(error);
    }
  }
}
