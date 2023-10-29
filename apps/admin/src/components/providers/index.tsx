import AntdProvider from './antd-provider'

interface IKRSProvidersProps {
  children: React.ReactNode
}

const KRSProviders: React.FC<IKRSProvidersProps> = ({ children }) => {
  return <AntdProvider>{children}</AntdProvider>
}

export default KRSProviders
