import { IUndoableQueue } from '@module/interfaces'

export interface IUndoableQueueContext {
  notifications: IUndoableQueue[]
  notificationDispatch: React.Dispatch<any>
}

export enum ActionTypes {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  DECREASE_NOTIFICATION_SECOND = 'DECREASE_NOTIFICATION_SECOND'
}
