import React, { ReactNode, useReducer } from 'react'
import isEqual from 'lodash/isEqual'

import { IUndoableQueue } from '@module/interfaces'
import { ActionTypes, IUndoableQueueContext } from './undoable-queue.type'

export const UndoableQueueContext = React.createContext<IUndoableQueueContext>({
  notifications: [],
  notificationDispatch: () => false
})

const initialState: IUndoableQueue[] = []

export const undoableQueueReducer = (state: IUndoableQueue[], action: any) => {
  switch (action.type) {
    case ActionTypes.ADD:
      // eslint-disable-next-line no-case-declarations
      const newState = state.filter((notificationItem: IUndoableQueue) => {
        return !(
          isEqual(notificationItem.id, action.payload.id) &&
          notificationItem.resource == action.payload.resource
        )
      })

      return [
        ...newState,
        {
          ...action.payload,
          isRunning: true
        }
      ]
    case ActionTypes.REMOVE:
      return state.filter(
        (notificationItem: IUndoableQueue) =>
          !(
            isEqual(notificationItem.id, action.payload.id) &&
            notificationItem.resource == action.payload.resource
          )
      )
    case ActionTypes.DECREASE_NOTIFICATION_SECOND:
      return state.map((notificationItem: IUndoableQueue) => {
        if (
          isEqual(notificationItem.id, action.payload.id) &&
          notificationItem.resource == action.payload.resource
        ) {
          return {
            ...notificationItem,
            seconds: action.payload.seconds - 1000
          }
        }
        return notificationItem
      })
    default:
      return state
  }
}

export const UndoableQueueContextProvider: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const [notifications, notificationDispatch] = useReducer(
    undoableQueueReducer,
    initialState
  )

  const notificationData = { notifications, notificationDispatch }

  return (
    <UndoableQueueContext.Provider value={notificationData}>
      {children}
      {typeof window !== 'undefined' &&
        notifications.map((notification) => (
          <UndoableQueue
            key={`${notification.id}-${notification.resource}-queue`}
            notification={notification}
          />
        ))}
    </UndoableQueueContext.Provider>
  )
}
