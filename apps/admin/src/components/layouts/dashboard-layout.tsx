import { useCallback, useEffect } from 'react'
import { Layout, Grid } from 'antd'

import { LayoutWidth } from 'src/common/interface/common'
import { AppReducerAction, useAppGlobal } from 'src/contexts/app-global.context'
import { isBrowser, off, on } from 'src/utils/misc'

import { StyledContainer, StyledLayoutContent } from './styles'
import BaseLayout from './base-layout'
import Aside from './aside'
import HeaderApp from './header'

interface IDashboardLayoutProps {
  children: React.ReactNode
}

const { useBreakpoint } = Grid

const DashboardLayout: React.FC<IDashboardLayoutProps> = ({ children }) => {
  const screens = useBreakpoint()
  const { state, dispatch } = useAppGlobal()
  const { device, collapsed } = state

  const toggle = () => {
    dispatch({ type: AppReducerAction.SET_COLLAPSED, collapsed: !collapsed })
  }

  const onResize = useCallback(() => {
    if (screens.xs || screens.sm || screens.md) {
      dispatch({ type: AppReducerAction.SET_COLLAPSED, collapsed: true })
      dispatch({ type: AppReducerAction.SET_DEVICE, device: LayoutWidth.Mobile })
    }

    if (screens.lg || screens.xl || screens.xxl) {
      dispatch({ type: AppReducerAction.SET_DEVICE, device: LayoutWidth.Desktop })
    }
  }, [dispatch, screens])

  useEffect((): (() => void) | void => {
    if (isBrowser) {
      onResize()
      on(window, 'resize', onResize)

      return () => off(window, 'resize', onResize)
    }
  }, [onResize])

  return (
    <BaseLayout>
      <Aside isMobile={device === LayoutWidth.Mobile} toggle={toggle} collapsed={collapsed} />
      <Layout>
        <HeaderApp toggle={toggle} collapsed={collapsed} />
        <StyledLayoutContent>
          <StyledContainer>{children}</StyledContainer>
        </StyledLayoutContent>
      </Layout>
    </BaseLayout>
  )
}

export default DashboardLayout
