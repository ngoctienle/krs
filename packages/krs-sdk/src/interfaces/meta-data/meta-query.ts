import { QueryFunctionContext } from '@tanstack/react-query'
import { QueryBuilderOptions } from './query-builder-options'

export type MetaQuery = {
  [k: string]: any
  queryContext?: Omit<QueryFunctionContext, 'meta'>
} & QueryBuilderOptions
