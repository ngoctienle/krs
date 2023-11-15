import { useCallback, useEffect } from 'react'
import { Layout, Grid } from 'antd'

import { LayoutWidth } from 'src/common/interface/common'
import { isBrowser, off, on } from 'src/utils/misc'
import useKrsStore from 'src/hooks/use-krs-store'

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
  const { persist, setPersist } = useKrsStore((state) => ({
    persist: state.persist,
    setPersist: state.setPersist
  }))
  const { device, collapsed } = persist

  const toggle = () => {
    setPersist({ collapsed: !collapsed })
  }

  const onResize = useCallback(() => {
    if (screens.xs || screens.sm || screens.md) {
      setPersist({ collapsed: true, device: LayoutWidth.Mobile })
    }

    if (screens.lg || screens.xl || screens.xxl) {
      setPersist({ device: LayoutWidth.Desktop })
    }
  }, [screens, setPersist])

  useEffect((): (() => void) | void => {
    if (isBrowser) {
      on(window, 'resize', onResize)

      return () => off(window, 'resize', onResize)
    }
  }, [onResize])

  return (
    <BaseLayout>
      <Aside
        isMobile={device === LayoutWidth.Mobile}
        toggle={toggle}
        collapsed={collapsed}
      />
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
