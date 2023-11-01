import { Flex, theme as antTheme } from 'antd'
import Icons from 'src/components/core/icons'

interface IAppLogoProps {
  collapsed: boolean
}

const AppLogo: React.FC<IAppLogoProps> = ({ collapsed }) => {
  const token = antTheme.useToken()

  return (
    <Flex align='center' justify='center' style={{ height: 64 }}>
      {!collapsed ? (
        <Icons.AppLogo style={{ color: token.token.colorTextBase }} />
      ) : (
        <Icons.ShortLogo style={{ color: token.token.colorTextBase }} />
      )}
    </Flex>
  )
}

export default AppLogo
