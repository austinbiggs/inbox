import { InMemoryCache } from "@apollo/client/cache";

import { TypedTypePolicies } from "./apollo-helpers";
import { clientSchemaPolicies } from "./schema";

const typePolicies: TypedTypePolicies = {
  ...clientSchemaPolicies,
};

export const cache = new InMemoryCache({
  typePolicies,
});
