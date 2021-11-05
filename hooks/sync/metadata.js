const fs = require("fs");

const fetch = require("node-fetch");
const { loadEnvConfig } = require("@next/env");

const projectDir = process.cwd();
const env = loadEnvConfig(projectDir).combinedEnv;

const hasuraEndpoint = env.HASURA_BASE_URL;
const hasuraMetaDataEndpoint = `${hasuraEndpoint}/v1/metadata`;
const hasuraAdminSecret = env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

const metadata = () => {
  fetch(hasuraMetaDataEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Hasura-Role": "admin",
      "X-Hasura-Admin-Secret": hasuraAdminSecret, // this may be the issue
    },
    body: JSON.stringify({
      type: "export_metadata",
      args: {},
    }),
  })
    .then((result) => {
      result.text().then((body) => {
        fs.writeFile("./gql/metadata.json", body, (feError) => {
          if (feError) {
            console.log("❌ Hasura Metadata failed to sync!");
            // return console.log(feError);
            return;
          }

          console.log("✅ Hasura Metadata synced!");
          return { success: true };
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

metadata();
