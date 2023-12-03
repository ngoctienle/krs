import { QueryKey } from '@tanstack/react-query'

import { BaseRecord, IQueryKeys } from 'src/interfaces'
import {
  GetListResponse,
  GetOneResponse
} from '@module/contexts/data/data.type'

export type MutationMode = 'pessimistic' | 'optimistic' | 'undoable'

export type QueryResponse<T = BaseRecord> =
  | GetListResponse<T>
  | GetOneResponse<T>

export type PreviousQuery<TData> = [QueryKey, TData | unknown]

export type PrevContext<TData> = {
  previousQueries: PreviousQuery<TData>[]
  /**
   * @deprecated `QueryKeys` is deprecated in favor of `keys`. Please use `keys` instead to construct query keys for queries and mutations.
   */
  queryKey: IQueryKeys
}

export type Context = {
  previousQueries: ContextQuery[]
}

export type ContextQuery<T = BaseRecord> = {
  query: QueryResponse<T>
  queryKey: QueryKey
}
