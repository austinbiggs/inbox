import { ApolloClient } from "@apollo/client";

import { cache } from "./cache";
import { link } from "./link";
import { clientSchemaTypeDefs } from "./schema";

export const client = new ApolloClient({
  cache,
  link,
  name: "web",
  typeDefs: clientSchemaTypeDefs, // enables client-side mocking in components
  version: "2.0",
});
