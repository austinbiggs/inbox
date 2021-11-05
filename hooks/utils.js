// eslint-disable-next-line import/no-extraneous-dependencies
const { loadEnvConfig } = require("@next/env");

const projectDir = process.cwd();
export const ENVIRONMENT_VARIABLES = loadEnvConfig(projectDir).combinedEnv;
