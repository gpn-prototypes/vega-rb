import { ApolloQueryResult, useApolloClient } from '@apollo/client';
import { OperationVariables } from '@apollo/client/core';
import { QueryOptions } from '@apollo/client/core/watchQueryOptions';

export async function useAsyncQuery<TData, TVariables = OperationVariables>(
  options: QueryOptions<TVariables>,
): Promise<ApolloQueryResult<TData>> {
  const client = useApolloClient();
  const result = await client.query<TData>(options);
  return result;
}
