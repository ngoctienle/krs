import React from 'react'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'

// eslint-disable-next-line react-refresh/only-export-components
export const history = createBrowserHistory()

interface HistoryRouterProps {
  history: typeof history
  children: React.ReactNode
}

export const HistoryRouter: React.FC<HistoryRouterProps> = ({
  history,
  children
}) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location
  })

  React.useLayoutEffect(() => {
    history.listen(setState)
  }, [history])

  return React.createElement(
    Router,
    Object.assign({ children, navigator: history }, state)
  )
}
