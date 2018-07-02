// @flow
import crypt from "power-crypt";

import type { EntityClient } from "phenyl-interfaces";
import type { EntityMap } from "./types";

export default (async function insertFixtures(
  client: EntityClient<EntityMap>,
  fixtureGroups: { [string]: { [string]: Object } }
): Promise<void> {
  for (const entityName: $FlowIssue in fixtureGroups) {
    for (const entityId in fixtureGroups[entityName]) {
      const value = Object.assign(fixtureGroups[entityName][entityId], {
        id: entityId,
      });

      if (value.hasOwnProperty("password")) {
        value.password = crypt(value.password);
      }

      try {
        // $FlowIssue
        await client.insertOne({ entityName, value });
        console.info(`Inserted ${entityName}/${entityId}`);
      } catch (e) {
        console.info(
          `An error occured in ${entityName}/${entityId}: ${e.stack}`
        );
      }
    }
  }
});
