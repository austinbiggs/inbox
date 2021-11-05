import * as React from "react";
import { find, isNaN, isNull, isUndefined } from "lodash";

import { Entity } from "components/admin/types";

import { useGetPostByIdLazyQuery } from "./graphql/hooks/get-post-by-id";
import { useGetPageByIdLazyQuery } from "./graphql/hooks/get-page-by-id";

const QUERY_MAPPING = [
  {
    type: "Page",
    query: useGetPageByIdLazyQuery,
  },
  {
    type: "Post",
    query: useGetPostByIdLazyQuery,
  },
];

export const useFetchEntity = (entity: Entity) => {
  const { id, type } = entity;
  const { query } = find(QUERY_MAPPING, (query) => query.type === type);

  // setup lazy query
  const [queryEntity, { loading, data }] = query({
    variables: {
      id,
    },
  });

  // only call query once
  React.useEffect(() => {
    if (!isUndefined(entity.id) && !isNaN(entity.id) && !isNull(entity.id)) {
      queryEntity();
    }
  }, [entity.id]);

  return { data, loading };
};
