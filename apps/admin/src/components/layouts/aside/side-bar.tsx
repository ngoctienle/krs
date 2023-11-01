import { Layout, theme as antTheme } from 'antd'

interface ISideBarProps {
  children: React.ReactNode
  collapsed: boolean
}

const { Sider } = Layout

const SideBar: React.FC<ISideBarProps> = ({ children, collapsed }) => {
  const token = antTheme.useToken()
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={80}
      breakpoint='md'
      style={{
        backgroundColor: token.token.colorBgContainer,
        paddingLeft: '6px',
        paddingRight: '6px'
      }}>
      {children}
    </Sider>
  )
}

export default SideBar
