import { from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Bugsnag from "@bugsnag/js";

const hasuraEndpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT;
const hasuraAdminSecret = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

const headers = {
  "x-hasura-admin-secret": hasuraAdminSecret,
};

const errorLink = onError(({ networkError }) => Bugsnag.notify(networkError));

const httpLink = new HttpLink({
  headers,
  uri: hasuraEndpoint,
});

export const link = from([errorLink, httpLink]);
