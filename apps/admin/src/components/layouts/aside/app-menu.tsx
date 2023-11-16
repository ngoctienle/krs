import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'

import { LayoutWidth, MenuList } from 'src/common/interface/common'
import { type IconsType, Icons } from 'src/components/core'
import { useKrsStore } from 'src/hooks'
import { useLocale } from 'src/locales'

interface IAppMenuProps {
  menuList: MenuList
  openKey?: string
  onChangeOpenKey: (key?: string) => void
  selectedKey: string
  onChangeSelectedKey: (key: string) => void
}

const AppMenu: React.FC<IAppMenuProps> = ({
  menuList,
  openKey,
  onChangeOpenKey,
  selectedKey,
  onChangeSelectedKey
}) => {
  const navigate = useNavigate()
  const { formatMessage } = useLocale()
  const { persist, setPersist } = useKrsStore((state) => ({
    persist: state.persist,
    setPersist: state.setPersist
  }))
  const { device } = persist

  const getIcons = (icon: IconsType) => {
    const Icon = Icons[icon]
    return <Icon size={16} />
  }

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path)
    navigate(path)

    if (device !== LayoutWidth.Desktop) {
      setPersist({ collapsed: true })
    }
  }

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop()
    onChangeOpenKey(key)
  }

  return (
    <Menu
      mode='inline'
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={(k) => onMenuClick(k.key)}
      style={{
        borderRight: 'none'
      }}
      items={menuList.map((menu) => {
        return menu.children
          ? {
              key: menu.key,
              label: formatMessage({ id: menu.label }),
              icon: getIcons(menu.icon),
              children: menu.children.map((child) => ({
                key: child.path,
                label: formatMessage({ id: child.label })
              }))
            }
          : {
              key: menu.path,
              label: formatMessage({ id: menu.label }),
              icon: getIcons(menu.icon)
            }
      })}
    />
  )
}

export default AppMenu
