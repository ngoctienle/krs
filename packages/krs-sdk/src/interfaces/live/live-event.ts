import { BaseKey, MetaQuery } from '@module/interfaces'

export type LiveEvent = {
  channel: string
  type: 'deleted' | 'updated' | 'created' | '*' | string
  payload: {
    ids?: BaseKey[]
    [x: string]: any
  }
  date: Date
  meta?: MetaQuery & {
    dataProviderName?: string
  }
}
