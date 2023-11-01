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
      styles={{
        body: {
          padding: '0 6px'
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
