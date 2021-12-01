/* eslint-disable */
// @generated by graphql-codegen
// This file was automatically generated and should not be edited.
import * as Types from "../../../../frontend/gql/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type InsertMessagesMutationVariables = Types.Exact<{
  messages: Array<Types.Messages_Insert_Input> | Types.Messages_Insert_Input;
}>;

export type InsertMessagesMutation = {
  __typename?: "mutation_root";
  insert_messages?:
    | {
        __typename?: "messages_mutation_response";
        returning: Array<{
          __typename?: "messages";
          created_by: number;
          id: any;
          body: string;
        }>;
      }
    | null
    | undefined;
};

export const InsertMessagesDocument = gql`
  mutation InsertMessages($messages: [messages_insert_input!]!) {
    insert_messages(objects: $messages) {
      returning {
        created_by
        id
        body
      }
    }
  }
`;
export type InsertMessagesMutationFn = Apollo.MutationFunction<
  InsertMessagesMutation,
  InsertMessagesMutationVariables
>;

/**
 * __useInsertMessagesMutation__
 *
 * To run a mutation, you first call `useInsertMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertMessagesMutation, { data, loading, error }] = useInsertMessagesMutation({
 *   variables: {
 *      messages: // value for 'messages'
 *   },
 * });
 */
export function useInsertMessagesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InsertMessagesMutation,
    InsertMessagesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    InsertMessagesMutation,
    InsertMessagesMutationVariables
  >(InsertMessagesDocument, options);
}
export type InsertMessagesMutationHookResult = ReturnType<
  typeof useInsertMessagesMutation
>;
export type InsertMessagesMutationResult =
  Apollo.MutationResult<InsertMessagesMutation>;
export type InsertMessagesMutationOptions = Apollo.BaseMutationOptions<
  InsertMessagesMutation,
  InsertMessagesMutationVariables
>;
