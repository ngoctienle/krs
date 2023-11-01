import { Layout } from 'antd'

interface IBaseLayoutProps {
  children: React.ReactNode
}

const BaseLayout: React.FC<IBaseLayoutProps> = ({ children }) => {
  return <Layout style={{ minHeight: '100vh' }}>{children}</Layout>
}

export default BaseLayout
