/* eslint-disable no-constant-condition */
import { type FC } from 'react'
import { type RouteObject, useRoutes, Navigate, Outlet } from 'react-router-dom'

import WrapperRouteComponent from './config'

function ProtectedRoute() {
  return true ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  return !true ? <Outlet /> : <Navigate to='/' />
}

const routeList: RouteObject[] = [
  {
    path: '',
    element: <RejectedRoute />,
    children: [
      {
        path: '/login',
        element: <WrapperRouteComponent element={<>Hello</>} titleId='title.login' />
      }
    ]
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: '*',
        element: <WrapperRouteComponent element={<>NF</>} titleId='title.404' />
      }
    ]
  }
]

const AppRouter: FC = () => {
  const element = useRoutes(routeList)
  return element
}

export default AppRouter
