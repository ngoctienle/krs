import 'dayjs/locale/vi'
import { useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import { theme as antdTheme } from 'antd'
/* import styled from 'styled-components' */
import dayjs from 'dayjs'
import enUS from 'antd/es/locale/en_US'
import viVN from 'antd/es/locale/vi_VN'

import AntdProvider from 'src/components/providers/antd-provider'
import { LayoutTheme, AppLocale } from 'src/common/interface/common'
import { HistoryRouter, history } from 'src/components/routes/history'
import { ErrorBoundary } from 'src/components/core'
import { localeConfig } from 'src/locales'
import { useKrsStore } from 'src/hooks'

/* const StyledSpin = styled(Spin)`
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
` */
interface IKRSProvidersProps {
  children: React.ReactNode
}

const KRSProviders: React.FC<IKRSProvidersProps> = ({ children }) => {
  const { persist } = useKrsStore((state) => ({
    persist: state.persist
  }))
  const { theme, app_language } = persist

  /** Initial locale setup */
  // set the locale for the user
  // more languages options can be added here
  useEffect(() => {
    if (app_language === AppLocale.EN) {
      dayjs.locale('en')
    } else if (app_language === AppLocale.VI) {
      dayjs.locale('vi')
    }
  }, [app_language])

  const getAntdLocale = () => {
    if (app_language === AppLocale.EN) {
      return enUS
    } else if (app_language === AppLocale.VI) {
      return viVN
    }
  }

  return (
    <AntdProvider
      locale={getAntdLocale()}
      componentSize='middle'
      prefixCls='krs'
      theme={{
        token: {
          colorPrimary: '#13c2c2'
        },
        components: {
          Typography: {
            titleMarginTop: 0,
            titleMarginBottom: 0
          }
        },
        algorithm:
          theme === LayoutTheme.Dark
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm
      }}>
      <IntlProvider
        locale={app_language.split('_')[0]}
        messages={localeConfig[app_language]}>
        <ErrorBoundary>
          <HistoryRouter history={history}>{children}</HistoryRouter>
        </ErrorBoundary>
      </IntlProvider>
    </AntdProvider>
  )
}

export default KRSProviders
