import {
  CrudFilters,
  CrudSorting,
  Pagination
} from '@module/contexts/data/data.type'
import { QueryKey } from '@tanstack/react-query'

import { BaseKey } from 'src/interfaces'

export interface IQueryKeys {
  all: QueryKey
  resourceAll: QueryKey
  list: (
    config?:
      | UseListConfig
      | {
          pagination?: Required<Pagination>
          hasPagination?: boolean
          sorters?: CrudSorting
          filters?: CrudFilters
        }
      | undefined
  ) => QueryKey
  many: (ids?: BaseKey[]) => QueryKey
  detail: (id?: BaseKey) => QueryKey
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logList: (meta?: Record<number | string, any>) => QueryKey
}
