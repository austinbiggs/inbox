import { from, HttpLink, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from "subscriptions-transport-ws";
import Bugsnag from "@bugsnag/js";

const hasuraEndpoint = process.env.NEXT_PUBLIC_HASURA_ENDPOINT;
const hasuraWebSockerEndpoint = process.env.NEXT_PUBLIC_HASURA_WEBSOCKET_ENDPOINT;
const hasuraAdminSecret = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

const headers = {
  "x-hasura-admin-secret": hasuraAdminSecret,
};

const errorLink = onError(({ networkError }) => Bugsnag.notify(networkError));

const httpLink = new HttpLink({
  headers,
  uri: hasuraEndpoint,
});

const isBrowser = typeof window !== 'undefined'

// WS doesn't work on the server
const wsLink = isBrowser
  ? new WebSocketLink(
    new SubscriptionClient(hasuraWebSockerEndpoint, {
      reconnect: true,
      timeout: 30000,
      connectionParams: {
        headers,
      }
    })
  )
  : null;

export const link = isBrowser
  ? split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query)
      console.log({query}, {kind}, {operation});
      return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink,
  )
  : from([errorLink, httpLink]);
