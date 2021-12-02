/* eslint-disable */
// @generated by graphql-codegen
// This file was automatically generated and should not be edited.
import * as Types from "../../../../../gql/types";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type InsertMessageMutationVariables = Types.Exact<{
  message: Types.Messages_Insert_Input;
}>;

export type InsertMessageMutation = {
  __typename?: "mutation_root";
  insert_messages_one?:
    | { __typename?: "messages"; created_by: number; id: any; body: string }
    | null
    | undefined;
};

export const InsertMessageDocument = gql`
  mutation InsertMessage($message: messages_insert_input!) {
    insert_messages_one(object: $message) {
      created_by
      id
      body
    }
  }
`;
export type InsertMessageMutationFn = Apollo.MutationFunction<
  InsertMessageMutation,
  InsertMessageMutationVariables
>;

/**
 * __useInsertMessageMutation__
 *
 * To run a mutation, you first call `useInsertMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertMessageMutation, { data, loading, error }] = useInsertMessageMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useInsertMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InsertMessageMutation,
    InsertMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    InsertMessageMutation,
    InsertMessageMutationVariables
  >(InsertMessageDocument, options);
}
export type InsertMessageMutationHookResult = ReturnType<
  typeof useInsertMessageMutation
>;
export type InsertMessageMutationResult =
  Apollo.MutationResult<InsertMessageMutation>;
export type InsertMessageMutationOptions = Apollo.BaseMutationOptions<
  InsertMessageMutation,
  InsertMessageMutationVariables
>;
