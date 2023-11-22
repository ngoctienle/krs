import { MenuList } from 'src/common/interface/common'
import appRoutes from './app-routes'

const appSetting = Object.freeze({
  roles: {},
  permissions: {},
  menu: [
    {
      key: 'dashboard',
      label: 'global.menu.dashboard',
      icon: 'LayoutDashboard',
      path: appRoutes.root
    },
    {
      key: 'settings',
      label: 'global.menu.settings',
      icon: 'Setting',
      path: appRoutes.settings,
      children: [
        {
          key: 'routePermission',
          label: 'global.menu.setting_system',
          path: appRoutes.systemSetting
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
