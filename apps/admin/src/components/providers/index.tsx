/* eslint-disable import/no-named-as-default */
import 'dayjs/locale/vi'
import { useEffect, Suspense } from 'react'
import { theme as antdTheme, Spin } from 'antd'
import { IntlProvider } from 'react-intl'
import styled from 'styled-components'
import dayjs from 'dayjs'
import enUS from 'antd/es/locale/en_US'
import viVN from 'antd/es/locale/vi_VN'

import { off, on } from 'src/utils/ misc'
import { LayoutTheme, AppLocale } from 'src/common/interface/common'
import { HistoryRouter, history } from 'src/components/routes/history'
import { useAppGlobal, AppReducerAction } from 'src/contexts/app-global.context'
import { LocaleFormatter, localeConfig } from 'src/locales'
import krsStorage from 'src/utils/local-storage'
import AntdProvider from './antd-provider'
import ErrorBoundary from '../core/error-boundary'

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
  const { state, dispatch } = useAppGlobal()
  const { theme, loading, locale } = state

  const setThemeApp = (dark = true) => {
    dispatch({ type: AppReducerAction.SET_THEME, theme: dark ? LayoutTheme.Dark : LayoutTheme.Light })
  }

  /** Initial theme setup */
  useEffect((): (() => void) | void => {
    setThemeApp(theme === LayoutTheme.Dark)
    // If theme is not set in local storage, consider system preference
    if (!krsStorage.getTheme()) {
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

  /** Initial locale setup */
  // set the locale for the user
  // more languages options can be added here
  useEffect(() => {
    if (locale === AppLocale.EN) {
      dayjs.locale('en')
    } else if (locale === AppLocale.VI) {
      dayjs.locale('vi')
    }
  }, [locale])

  const getAntdLocale = () => {
    if (locale === AppLocale.EN) {
      return enUS
    } else if (locale === AppLocale.VI) {
      return viVN
    }
  }

  return (
    <AntdProvider
      locale={getAntdLocale()}
      componentSize='middle'
      theme={{
        token: {
          colorPrimary: '#13c2c2'
        },
        algorithm: theme === LayoutTheme.Dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm
      }}>
      <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
        <ErrorBoundary>
          <HistoryRouter history={history}>
            <Suspense fallback={null}>
              <StyledSpin
                spinning={loading}
                style={{
                  backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.44)' : 'rgba(255, 255, 255, 0.44)'
                }}
                tip={<LocaleFormatter id='global.tips.loading' />}
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
