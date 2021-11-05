const fs = require("fs");

const fetch = require("node-fetch");
const { loadEnvConfig } = require("@next/env");

const projectDir = process.cwd();
const env = loadEnvConfig(projectDir).combinedEnv;

const hasuraEndpoint = env.HASURA_BASE_URL;
const hasuraPGDumpEndpoint = `${hasuraEndpoint}/v1alpha1/pg_dump`;
const hasuraAdminSecret = env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

const postgres = () => {
  fetch(hasuraPGDumpEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-Admin-Secret": hasuraAdminSecret, // this may be the issue
    },
    body: JSON.stringify({
      opts: ["-O", "-x", "--schema-only", "--schema", "public"],
      clean_output: true,
    }),
  })
    .then((result) => {
      result.text().then((body) => {
        fs.writeFile("./gql/schema.psql", body, (feError) => {
          if (feError) {
            console.log("❌ Hasura Schema (as PSQL) failed to sync!");
            // return console.log(feError);
            return;
          }

          console.log("✅ Hasura Schema (as PSQL) synced!");
          return { success: true };
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

postgres();
