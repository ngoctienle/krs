import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

interface IScollableContainerProps {
  children: React.ReactNode
  styles?: React.CSSProperties
}

const ScollableContainer: React.FC<IScollableContainerProps> = ({ children, styles }) => {
  return (
    <SimpleBar autoHide style={styles}>
      {children}
    </SimpleBar>
  )
}

export default ScollableContainer
