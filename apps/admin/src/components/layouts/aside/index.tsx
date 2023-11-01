import ScrollableContainer from 'src/components/core/scrollable-container'
import Drawer from './drawer'
import SideBar from './side-bar'
import AppLogo from './app-logo'
import AppMenu from './app-menu'
import { useEffect, useState } from 'react'
import { MenuChild, MenuList } from 'src/common/interface/common'
import { useLocation } from 'react-router-dom'
import { appSetting } from 'src/common/config/settings'

interface IAsideProps {
  isMobile: boolean
  collapsed: boolean
  toggle: () => void
}

const styles: React.CSSProperties = {
  maxHeight: 'calc(100vh - 70px)',
  overflowX: 'hidden'
}

const Aside: React.FC<IAsideProps> = ({ isMobile, collapsed, toggle }) => {
  const location = useLocation()
  const [openKey, setOpenkey] = useState<string>()
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname)
  const [menuList, setMenuList] = useState<MenuList>([])

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = []

    menu.forEach((m) => {
      if (!m?.children?.length) {
        MenuListAll.push(m)
      } else {
        m?.children.forEach((mu) => {
          MenuListAll.push(mu)
        })
      }
    })

    return MenuListAll
  }

  console.log(initMenuListAll(appSetting.menu))

  useEffect(() => {
    setMenuList(appSetting.menu)
  }, [])

  return (
    <>
      {!isMobile ? (
        <SideBar collapsed={collapsed}>
          <ScrollableContainer styles={styles}>
            <AppLogo collapsed={collapsed} />
            <AppMenu
              menuList={menuList}
              openKey={openKey}
              onChangeOpenKey={(k) => setOpenkey(k)}
              selectedKey={selectedKey}
              onChangeSelectedKey={(k) => setSelectedKey(k)}
            />
          </ScrollableContainer>
        </SideBar>
      ) : (
        <Drawer collapsed={collapsed} toggle={toggle}>
          <ScrollableContainer styles={styles}>
            <AppLogo collapsed={false} />
            <AppMenu
              menuList={menuList}
              openKey={openKey}
              onChangeOpenKey={(k) => setOpenkey(k)}
              selectedKey={selectedKey}
              onChangeSelectedKey={(k) => setSelectedKey(k)}
            />
          </ScrollableContainer>
        </Drawer>
      )}
    </>
  )
}

export default Aside
