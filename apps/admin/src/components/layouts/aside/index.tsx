import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { appSetting } from 'src/common/config/settings'
import ScrollableContainer from 'src/components/core/scrollable-container'
import krsHelper from 'src/utils/helpers'
import Drawer from './drawer'
import SideBar from './side-bar'
import AppLogo from './app-logo'
import AppMenu from './app-menu'

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

  /* const initMenuListAll = (menu: MenuList) => {
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
  } */

  useEffect(() => {
    const code = krsHelper.getMenuCode(location.pathname)

    setOpenkey(code)
    setSelectedKey(location.pathname)
  }, [location.pathname])

  return (
    <>
      {!isMobile ? (
        <SideBar collapsed={collapsed}>
          <ScrollableContainer styles={styles}>
            <AppLogo collapsed={collapsed} />
            <AppMenu
              menuList={appSetting.menu}
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
              menuList={appSetting.menu}
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
