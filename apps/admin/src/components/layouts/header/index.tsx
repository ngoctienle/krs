/* eslint-disable import/no-named-as-default */
import { Button, Flex, Layout, theme as antTheme } from 'antd'
import Icons from 'src/components/core/icons'
import styled from 'styled-components'

interface IHeaderAppProps {
  collapsed: boolean
  toggle: () => void
}

const { Header } = Layout
const StyledHeader = styled(Header)`
  padding: 0 16px;
`

const HeaderApp: React.FC<IHeaderAppProps> = ({ collapsed, toggle }) => {
  const token = antTheme.useToken()

  return (
    <StyledHeader
      style={{
        backgroundColor: token.token.colorBgContainer
      }}>
      <Flex align='center' style={{ height: '100%' }}>
        <Button
          type='text'
          shape='default'
          icon={!collapsed ? <Icons.Outdent /> : <Icons.Indent />}
          onClick={toggle}
        />
      </Flex>
    </StyledHeader>
  )
}

export default HeaderApp
