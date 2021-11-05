import * as React from "react";
import { gql, useQuery } from "@apollo/client";

export const ClientSchemaExampleQuery = gql`
  query clientSchemaExampleQuery($userId: ID!) {
    users_by_pk(id: $userId) {
      mockedField @client
    }
  }
`;

interface Props {
  userId: string;
}

export const ClientSchemaExample: React.FC<Props> = (props) => {
  const { userId } = props;
  const { data } = useQuery(ClientSchemaExampleQuery, {
    variables: { userId },
  });

  return <span>{data?.users_by_pk?.mockedField}</span>;
};
