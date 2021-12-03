/* eslint-disable */
// @generated by graphql-codegen
// This file was automatically generated and should not be edited.
import * as Types from "../../../../../gql/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type StreamThreadsSubscriptionVariables = Types.Exact<{
  userId: Types.Scalars["Int"];
}>;

export type StreamThreadsSubscription = {
  __typename?: "subscription_root";
  threads: Array<{
    __typename?: "threads";
    id: number;
    messages: Array<{
      __typename?: "messages";
      body: string;
      created_at: any;
      created_by: number;
    }>;
    threads_users: Array<{
      __typename?: "threads_users";
      user: {
        __typename?: "users";
        id: number;
        gif_url?: string | null | undefined;
        name: string;
      };
    }>;
  }>;
};

export const StreamThreadsDocument = gql`
  subscription StreamThreads($userId: Int!) {
    threads(
      where: { threads_users: { user_id: { _eq: $userId } } }
      limit: 25
    ) {
      id
      messages(
        limit: 1
        order_by: { created_at: desc }
        where: { status: { _eq: "sent" } }
      ) {
        body
        created_at
        created_by
      }
      threads_users {
        user {
          id
          gif_url
          name
        }
      }
    }
  }
`;

/**
 * __useStreamThreadsSubscription__
 *
 * To run a query within a React component, call `useStreamThreadsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useStreamThreadsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamThreadsSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useStreamThreadsSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    StreamThreadsSubscription,
    StreamThreadsSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    StreamThreadsSubscription,
    StreamThreadsSubscriptionVariables
  >(StreamThreadsDocument, options);
}
export type StreamThreadsSubscriptionHookResult = ReturnType<
  typeof useStreamThreadsSubscription
>;
export type StreamThreadsSubscriptionResult =
  Apollo.SubscriptionResult<StreamThreadsSubscription>;
