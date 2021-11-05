import * as React from "react";
import { find, isNaN, isNull, isUndefined } from "lodash";

import { Entity } from "components/admin/types";

import { useGetPagesLazyQuery } from "./graphql/hooks/get-pages";
import { useGetPostsLazyQuery } from "./graphql/hooks/get-posts";

const QUERY_MAPPING = [
  {
    type: "Page",
    query: useGetPagesLazyQuery,
  },
  {
    type: "Post",
    query: useGetPostsLazyQuery,
  },
];

export const useFetchEntities = (type: Entity["type"]) => {
  const { query } = find(QUERY_MAPPING, (query) => query.type === type);

  // setup lazy query
  const [queryEntity, { loading, data }] = query({
    variables: {
      limit: 25,
      status: "published",
    },
  });

  // only call query once
  React.useEffect(() => {
    if (!isUndefined(type) && !isNaN(type) && !isNull(type)) {
      queryEntity();
    }
  }, [type]);

  return { entities: data, loading, raw: data };
};
