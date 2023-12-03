import React from 'react'
import pluralize from 'pluralize'

import {
  IKrsContext,
  IKrsContextOptions,
  IKrsContextProvider
} from './krs.type'

export const defaultKrsOptions: IKrsContextOptions = {
  mutationMode: 'pessimistic',
  syncWithLocation: false,
  undoableTimeout: 5000,
  warnWhenUnsavedChanges: false,
  liveMode: 'off',
  redirect: {
    afterCreate: 'list',
    afterClone: 'list',
    afterEdit: 'list'
  },
  overtime: {
    interval: 1000
  },
  textTransformers: {
    humanize: humanizeString,
    plural: pluralize.plural,
    singular: pluralize.singular
  },
  disableServerSideValidation: false
}

export const KrsContext = React.createContext<IKrsContext>({
  hasDashboard: false,
  mutationMode: 'pessimistic',
  warnWhenUnsavedChanges: false,
  syncWithLocation: false,
  undoableTimeout: 5000,
  Title: undefined,
  Sider: undefined,
  Header: undefined,
  Footer: undefined,
  Layout: DefaultLayout,
  OffLayoutArea: undefined,
  liveMode: 'off',
  onLiveEvent: undefined,
  options: defaultKrsOptions
})

export const KrsContextProvider: React.FC<IKrsContextProvider> = ({
  hasDashboard,
  mutationMode,
  warnWhenUnsavedChanges,
  syncWithLocation,
  undoableTimeout,
  children,
  DashboardPage,
  Title,
  Layout = DefaultLayout,
  Header,
  Sider,
  Footer,
  OffLayoutArea,
  LoginPage = DefaultLoginPage,
  catchAll,
  liveMode = 'off',
  onLiveEvent,
  options
}) => {
  return (
    <KrsContext.Provider
      value={{
        hasDashboard,
        mutationMode,
        warnWhenUnsavedChanges,
        syncWithLocation,
        Title,
        undoableTimeout,
        Layout,
        Header,
        Sider,
        Footer,
        OffLayoutArea,
        DashboardPage,
        LoginPage,
        catchAll,
        liveMode,
        onLiveEvent,
        options
      }}>
      {children}
    </KrsContext.Provider>
  )
}
