import BaseLayout from './base-layout'

interface IAuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
  return <BaseLayout>{children}</BaseLayout>
}

export default AuthLayout
