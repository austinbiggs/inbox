const fs = require("fs");

const fetch = require("node-fetch");
const { loadEnvConfig } = require("@next/env");

const projectDir = process.cwd();
const env = loadEnvConfig(projectDir).combinedEnv;

const hasuraEndpoint = env.NEXT_PUBLIC_HASURA_ENDPOINT;
const hasuraAdminSecret = env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

// query taken from https://github.com/hasura/graphql-engine/blob/master/server/src-rsr/introspection.json
const legacySchema = () => {
  fetch(hasuraEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-Role": "admin",
      "X-Hasura-Admin-Secret": hasuraAdminSecret, // this may be the issue
    },
    body: JSON.stringify({
      query:
        "query IntrospectionQuery {\n  __schema {\n    queryType {\n      name\n    }\n    mutationType {\n      name\n    }\n    subscriptionType {\n      name\n    }\n    types {\n      ...FullType\n    }\n    directives {\n      name\n      description\n      locations\n      args {\n        ...InputValue\n      }\n    }\n  }\n}\n\nfragment FullType on __Type {\n  kind\n  name\n  description\n  fields(includeDeprecated: true) {\n    name\n    description\n    args {\n      ...InputValue\n    }\n    type {\n      ...TypeRef\n    }\n    isDeprecated\n    deprecationReason\n  }\n  inputFields {\n    ...InputValue\n  }\n  interfaces {\n    ...TypeRef\n  }\n  enumValues(includeDeprecated: true) {\n    name\n    description\n    isDeprecated\n    deprecationReason\n  }\n  possibleTypes {\n    ...TypeRef\n  }\n}\n\nfragment InputValue on __InputValue {\n  name\n  description\n  type {\n    ...TypeRef\n  }\n  defaultValue\n}\n\nfragment TypeRef on __Type {\n  kind\n  name\n  ofType {\n    kind\n    name\n    ofType {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
      variables: null,
      operationName: "IntrospectionQuery",
    }),
  })
    .then((result) => {
      result.text().then((body) => {
        fs.writeFile("./gql/schema.json", body, (feError) => {
          if (feError) {
            return console.log(feError);
          }

          console.log("✅ Hasura Schema JSON synced!");
          return { success: true };
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

legacySchema();
