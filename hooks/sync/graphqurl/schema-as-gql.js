const { exec } = require("child_process");

const { loadEnvConfig } = require("@next/env");

const projectDir = process.cwd();
const env = loadEnvConfig(projectDir).combinedEnv;

const hasuraEndpoint = env.NEXT_PUBLIC_HASURA_ENDPOINT;
const hasuraAdminSecret = env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

exec(
  `yarn --silent gq ${hasuraEndpoint} -H \"X-Hasura-Admin-Secret: ${hasuraAdminSecret}\" --introspect > gql/schema.gql`,
  (error) => {
    if (error) {
      console.log("❌ Hasura Schema (as GQL) failed to sync!");
      // return console.log(feError);
      return;
    }

    console.log("✅ Hasura Schema (as GQL) synced!");
  }
);
