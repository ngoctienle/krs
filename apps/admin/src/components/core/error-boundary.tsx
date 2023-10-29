import { Result } from 'antd'
import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}
interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }
  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error: ', error, errorInfo)
  }
  public render() {
    if (this.state.hasError) {
      return <Result status='500' />
    }
    return this.props.children
  }
}
