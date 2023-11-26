import { IResourceItem } from './bindings/resource'

export type BaseKey = string | number
export type BaseRecord = {
  id?: BaseKey
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
export type BaseOption = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
}

/**
 * @deprecated Use `BaseOption` instead.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Option extends BaseOption {}

/* Backward compatible version of 'TreeMenuItem' */
export type ITreeMenu = IResourceItem & {
  key?: string
  children: ITreeMenu[]
}

export type IMenuItem = IResourceItem & {
  key: string
  route: string
}

/* FromURLParams */
export * from './from-url-params'
/* Auth */
export * from './auth'
/* Bindings */
export * from './bindings'
/* Prettify */
export * from './prettify'
/* AutoSave */
export * from './auto-save'
/* TextTransformers */
export * from './text-transformers'
/* OptimisticUpdateMap */
export * from './optimistic-update-map'
/* Actions */
export * from './actions'
/* Notification */
export * from './notification'
/* MutationMode */
export * from './mutation-mode'
/* Errors */
export * from './errors'
/* CustomComponents */
export * from './custom-components'
/* ResourceRouterParams */
export * from './resource-router-params'
/* ResourceErrorRouterParams */
export * from './resource-error-router-params'
/* MapDataFN */
export * from './map-data-fn'
/* SuccessErrorNotification */
export * from './success-error-notification'
/* MetaData */
export * from './meta-data'
/* QueryKey */
export * from './query-key'
/* Live */
export * from './live'
/* AuditLog */
export * from './audit-log'
