import { ConfigProvider } from 'antd'
import type { ConfigProviderProps } from 'antd/es/config-provider'

import { GlobalStyle } from 'src/common/config/theme'

interface AntdProviderProps extends ConfigProviderProps {}

const AntdProvider: React.FC<AntdProviderProps> = ({ children, ...restProps }) => {
  return (
    <ConfigProvider {...restProps}>
      <GlobalStyle />
      {children}
    </ConfigProvider>
  )
}

export default AntdProvider
