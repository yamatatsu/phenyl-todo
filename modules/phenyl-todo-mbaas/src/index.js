// @flow
import express from "express";
import PhenylRestApi from "phenyl-rest-api";
import type { EntityClient } from "phenyl-interfaces";
import { createEntityClient as createMemoryClient } from "phenyl-memory-db";
import {
  createEntityClient as createMongoDBClient,
  connect,
} from "phenyl-mongodb";
import { createPhenylMiddleware } from "phenyl-express";
import {
  createUserDefinitions,
  createNonUserDefinitions,
  createCustomCommandDefinitions,
} from "./definition";
import insertFixtures from "./insert-fixtures";

import type { EntityMap } from "./types";

const __DEV__ = process.env.NODE_ENV === "development";

// TODO: move to only on develop
const fixtures = {
  user: {
    user1: {
      email: "001@example.com",
      password: "password123",
    },
  },
};

const getConnection = async (): Promise<EntityClient<EntityMap>> => {
  if (__DEV__) {
    console.info("Use memory client");
    const client = createMemoryClient();
    await insertFixtures(client, fixtures);
    return client;
  } else {
    // 非開発環境ならSentryのエラー監視を有効化
    console.info("Enable error tracking with Sentry");

    const MONGODB_URL = process.env.MONGODB_URL;
    if (!MONGODB_URL) {
      throw new Error(
        "Environment variable `MONGODB_URL` must be required but not defined"
      );
    }
    const connection = await connect(
      MONGODB_URL,
      "test"
    );
    console.info("Use MongoDB client");
    return createMongoDBClient(connection);
  }
};

const main = async () => {
  const entityClient: EntityClient<EntityMap> = await getConnection();
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8888;
  if (isNaN(port)) {
    throw new Error(
      `Environment variable 'PORT' must be integer: ${String(process.env.PORT)}`
    );
  }

  const functionalGroup = {
    customQueries: {},
    customCommands: createCustomCommandDefinitions(entityClient),
    users: createUserDefinitions(entityClient),
    nonUsers: createNonUserDefinitions(entityClient),
  };

  const sessionClient = entityClient.createSessionClient();
  const restApiHandler = PhenylRestApi.createFromFunctionalGroup(
    functionalGroup,
    {
      client: entityClient,
      sessionClient,
    }
  );

  const app = express();
  app.use(createPhenylMiddleware({ restApiHandler }));

  app.get("/", (req, res) => {
    res.send("OK");
  });

  app.listen(port, async () => {
    console.info(`Phenyl http server listen on :${port}`);
    console.info(`process.env.NODE_ENV=${String(process.env.NODE_ENV)}`);
  });
};

main().catch(error => {
  console.error(error);
  process.exit(1);
});
