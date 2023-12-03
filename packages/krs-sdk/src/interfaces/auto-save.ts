/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import { BaseRecord, HttpError } from '@module/interfaces'
import { UpdateResponse } from '@module/contexts/data/data.type'

export type AutoSaveProps<TVariables> = {
  autoSave?: {
    enabled: boolean
    debounce?: number
    onFinish?: (values: TVariables) => TVariables
    invalidateOnUnmount?: boolean
    invalidateOnClose?: boolean
  }
}

export type AutoSaveReturnType<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TVariables = {}
> = {
  autoSaveProps: Pick<
    UseUpdateReturnType<TData, TError, TVariables>,
    'data' | 'error' | 'status'
  >
  onFinishAutoSave: (
    values: TVariables
  ) => Promise<UpdateResponse<TData> | void> | void
}

export type AutoSaveIndicatorElements = Partial<
  Record<'success' | 'error' | 'loading' | 'idle', React.ReactNode>
>

export type AutoSaveIndicatorProps<
  TData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  // eslint-disable-next-line @typescript-eslint/ban-types
  TVariables = {}
> = {
  /**
   * The data returned by the update request.
   */
  data?: UseUpdateReturnType<TData, TError, TVariables>['data']
  /**
   * The error returned by the update request.
   */
  error?: UseUpdateReturnType<TData, TError, TVariables>['error']
  /**
   * The status of the update request.
   */
  status: UseUpdateReturnType<TData, TError, TVariables>['status']
  /**
   * The elements to display for each status.
   */
  elements?: AutoSaveIndicatorElements
}
