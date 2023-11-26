import { QueryFunctionContext } from '@tanstack/react-query'
import { QueryBuilderOptions } from './query-builder-options'

/**
 * @deprecated `MetaDataQuery` is deprecated, use `MetaQuery` instead, however, we still support `MetaDataQuery` for backward compatibility.
 */
export type MetaDataQuery = {
  [k: string]: any
  queryContext?: Omit<QueryFunctionContext, 'meta'>
} & QueryBuilderOptions
