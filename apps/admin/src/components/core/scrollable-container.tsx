import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

interface IScrollableContainerProps {
  children: React.ReactNode
  styles?: React.CSSProperties
}

const ScrollableContainer: React.FC<IScrollableContainerProps> = ({ children, styles }) => {
  return (
    <SimpleBar autoHide style={styles}>
      {children}
    </SimpleBar>
  )
}

export default ScrollableContainer
