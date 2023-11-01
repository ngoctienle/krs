import { Layout } from 'antd'

interface IAuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
  return <Layout>{children}</Layout>
}

export default AuthLayout
