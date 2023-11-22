/* eslint-disable no-constant-condition */
import { type FC, Suspense, lazy } from 'react'
import { type RouteObject, useRoutes, Navigate, Outlet } from 'react-router-dom'

import { appRoutes } from 'src/common/config/settings'
import { DashboardLayout, AuthLayout } from 'src/components/layouts'
import WrapperRouteComponent from './config'

const SystemPage = lazy(
  () => import(/* webpackChunkName: "SystemPage"*/ 'src/views/settings/system')
)

function ProtectedRoute() {
  return true ? (
    <DashboardLayout>
      <Suspense>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  ) : (
    <Navigate to='/login' />
  )
}
function RejectedRoute() {
  return !true ? (
    <AuthLayout>
      <Suspense>
        <Outlet />
      </Suspense>
    </AuthLayout>
  ) : (
    <Navigate to='/' />
  )
}

const routeList: RouteObject[] = [
  {
    path: '',
    element: <RejectedRoute />,
    children: [
      {
        path: '/login',
        element: (
          <WrapperRouteComponent element={<>Hello</>} titleId='title.login' />
        )
      }
    ]
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        path: appRoutes.root,
        element: (
          <WrapperRouteComponent
            element={<>HelloHome</>}
            titleId='documents.title.home'
          />
        )
      },
      {
        path: appRoutes.systemSetting,
        element: (
          <WrapperRouteComponent
            element={<SystemPage />}
            titleId='documents.title.setting_system'
          />
        )
      },
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
