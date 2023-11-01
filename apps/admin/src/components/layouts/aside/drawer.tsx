import { Drawer as DrawerAntd } from 'antd'

interface IDrawerProps {
  children: React.ReactNode
  collapsed: boolean
  toggle: () => void
}

const Drawer: React.FC<IDrawerProps> = ({ children, collapsed, toggle }) => {
  return (
    <DrawerAntd
      width={200}
      placement='left'
      drawerStyle={{ padding: '0px !important' }}
      contentWrapperStyle={{ padding: '0px !important' }}
      styles={{
        body: {
          padding: '0px !important'
        }
      }}
      closable={false}
      onClose={toggle}
      open={!collapsed}>
      {children}
    </DrawerAntd>
  )
}

export default Drawer
