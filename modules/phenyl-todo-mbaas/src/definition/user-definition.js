// @flow
import type {
  EntityClient,
  RequestData,
  ResponseData,
  Session,
  RestApiExecution,
} from "phenyl-interfaces";
import { StandardUserDefinition } from "phenyl-standards";
import type { EntityMap } from "../types";

// FIXME: 固くする
type AuthSetting = any;

const methodBlacklist = [
  // `insertOne`は許可
  "insertMulti",
  "insertAndGet",
  "insertAndGetMulti",
];

const noRequireLoginMethods = ["login", "insertOne"];

export default class UserDefinition extends StandardUserDefinition<
  EntityMap,
  AuthSetting
> {
  constructor(entityClient: EntityClient<EntityMap>) {
    super({
      entityClient,
      accountPropName: "email",
      passwordPropName: "password",
      ttl: 24 * 3600,
    });
  }

  async authorization(
    reqData: RequestData,
    session: ?Session
  ): Promise<boolean> {
    if (methodBlacklist.includes(reqData.method)) {
      throw new Error(
        `Method(${reqData.method}) not allowed. Must be one of 'insertOne'`
      );
    }

    if (noRequireLoginMethods.includes(reqData.method)) {
      return true;
    }

    if (!session) {
      return false;
    }

    return session && new Date(session.expiredAt) > new Date();
  }

  async wrapExecution(
    reqData: RequestData,
    session: ?Session,
    execution: RestApiExecution
  ): Promise<ResponseData> {
    return super.wrapExecution(reqData, session, execution);
  }
}
