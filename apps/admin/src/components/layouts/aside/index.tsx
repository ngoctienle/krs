import ScrollableContainer from 'src/components/core/scrollable-container'
import Drawer from './drawer'
import SideBar from './side-bar'
import AppLogo from './app-logo'

interface IAsideProps {
  isMobile: boolean
  collapsed: boolean
  toggle: () => void
}

const styles: React.CSSProperties = {
  maxHeight: 'calc(100vh - 70px)',
  overflowX: 'hidden'
}

const Aside: React.FC<IAsideProps> = ({ isMobile, collapsed, toggle }) => {
  return (
    <>
      {!isMobile ? (
        <SideBar collapsed={collapsed}>
          <ScrollableContainer styles={styles}>
            <AppLogo collapsed={collapsed} />
            Aside
          </ScrollableContainer>
        </SideBar>
      ) : (
        <Drawer collapsed={collapsed} toggle={toggle}>
          <ScrollableContainer styles={styles}>AsideM</ScrollableContainer>
        </Drawer>
      )}
    </>
  )
}

export default Aside
