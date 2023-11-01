import { MenuList } from 'src/common/interface/common'

const appSetting = Object.freeze({
  roles: {},
  permissions: {},
  menu: [
    {
      key: 'dashboard',
      label: 'global.menu.dashboard',
      icon: 'LayoutDashboard',
      path: '/dashboard'
    },
    {
      key: 'permission',
      label: 'global.menu.permission',
      icon: 'Setting',
      path: '/dashboard/permission',
      children: [
        {
          key: 'routePermission',
          label: 'global.menu.routePermission',
          path: '/dashboard/permission/route'
        },
        {
          key: 'notFound',
          label: 'global.menu.notFound',
          path: '/dashboard/permission/404'
        }
      ]
    }
  ] as MenuList
})

export default appSetting
