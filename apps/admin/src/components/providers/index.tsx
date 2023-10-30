/* eslint-disable import/no-named-as-default */
import { useEffect, Suspense } from 'react'
import { theme as antdTheme, Spin } from 'antd'
import styled from 'styled-components'

import { LayoutTheme } from 'src/common/interface/common'
import { off, on } from 'src/utils/ misc'

import { HistoryRouter, history } from 'src/components/routes/history'
import useAppGlobal from 'src/stores/app-global.store'
import AntdProvider from './antd-provider'
import ErrorBoundary from '../core/error-boundary'
import { IntlProvider } from 'react-intl'

const StyledSpin = styled(Spin)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
interface IKRSProvidersProps {
  children: React.ReactNode
}

const KRSProviders: React.FC<IKRSProvidersProps> = ({ children }) => {
  const { theme, setTheme, loading } = useAppGlobal((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
    loading: state.loading
  }))

  const setThemeApp = (dark = true) => {
    setTheme(dark ? LayoutTheme.Dark : LayoutTheme.Light)
  }

  /** Initial theme setup */
  useEffect((): (() => void) | void => {
    setThemeApp(theme === LayoutTheme.Dark)
    // If theme is not set in local storage, consider system preference
    if (!localStorage.getItem('theme')) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      setThemeApp(mql.matches)

      // Watch for changes in system theme preference
      const matchMode = (e: MediaQueryListEvent) => {
        setThemeApp(e.matches)
      }
      on(mql, 'change', matchMode)

      // Cleanup listener on component unmount
      return () => off(mql, 'change', matchMode)
    } else {
      setThemeApp(theme === LayoutTheme.Dark)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AntdProvider
      componentSize='middle'
      theme={{
        token: {
          colorPrimary: '#13c2c2'
        },
        algorithm: theme === LayoutTheme.Dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm
      }}>
      <IntlProvider locale=''>
        <ErrorBoundary>
          <HistoryRouter history={history}>
            <Suspense fallback={null}>
              <StyledSpin
                spinning={loading}
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.44)' : 'rgba(255, 255, 255, 0.44)'
                }}
              />
              {children}
            </Suspense>
          </HistoryRouter>
        </ErrorBoundary>
      </IntlProvider>
    </AntdProvider>
  )
}

export default KRSProviders
