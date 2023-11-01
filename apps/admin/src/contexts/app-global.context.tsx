/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from 'react'
import {
  AppLocaleType,
  LayoutTheme,
  LayoutThemeType,
  LayoutWidthType
} from 'src/common/interface/common'
import krsStorage from 'src/utils/local-storage'
import getGlobalState from 'src/utils/get-global-state'

enum AppReducerAction {
  SET_THEME = 'SET_THEME',
  SET_LOCALE = 'SET_LOCALE',
  SET_LOADING = 'SET_LOADING',
  SET_DEVICE = 'SET_DEVICE',
  SET_COLLAPSED = 'SET_COLLAPSED'
}
// Global Context Definition
interface AppGlobalContextInterface {
  device: LayoutWidthType
  theme: LayoutThemeType
  locale: AppLocaleType
  loading: boolean
  collapsed: boolean
}
interface AppGlobalProviderProps {
  children: React.ReactNode
}
// Global Context Dispatch Definition
type AppGlobalReducerInterface =
  | { type: AppReducerAction.SET_THEME; theme: LayoutThemeType }
  | { type: AppReducerAction.SET_LOCALE; locale: AppLocaleType }
  | { type: AppReducerAction.SET_LOADING; loading: boolean }
  | { type: AppReducerAction.SET_DEVICE; device: LayoutWidthType }
  | { type: AppReducerAction.SET_COLLAPSED; collapsed: boolean }

// Create Reducer
const appGlobalReducer = (
  state: AppGlobalContextInterface,
  action: AppGlobalReducerInterface
): AppGlobalContextInterface => {
  switch (action.type) {
    case AppReducerAction.SET_THEME:
      updateDOMForTheme(action.theme)
      krsStorage.storeTheme(action.theme)
      return { ...state, theme: action.theme }

    case AppReducerAction.SET_LOCALE:
      krsStorage.storeLocale(action.locale)
      return { ...state, locale: action.locale }

    case AppReducerAction.SET_LOADING:
      return { ...state, loading: action.loading }

    case AppReducerAction.SET_DEVICE:
      return { ...state, device: action.device }

    case AppReducerAction.SET_COLLAPSED:
      return { ...state, collapsed: action.collapsed }

    default:
      return state
  }
}

// Utility functions
const updateDOMForTheme = (theme: LayoutThemeType) => {
  const body = document.body
  if (theme === LayoutTheme.Dark) {
    if (!body.hasAttribute('theme-mode')) {
      body.setAttribute('theme-mode', LayoutTheme.Dark)
    }
  } else {
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode')
    }
  }
}

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? LayoutTheme.Dark
  : LayoutTheme.Light
const userTheme = krsStorage.getTheme()

// Initial App Context
const initAppGlobalContext: AppGlobalContextInterface = {
  ...getGlobalState(),
  theme: userTheme || systemTheme,
  locale: krsStorage.getLocale(),
  loading: false
}

// Create Context
const AppGlobalStateContext =
  createContext<AppGlobalContextInterface>(initAppGlobalContext)
const AppGlobalDispatchContext = createContext<
  React.Dispatch<AppGlobalReducerInterface> | undefined
>(undefined)

const AppGlobalProvider: React.FC<AppGlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appGlobalReducer, initAppGlobalContext)

  return (
    <AppGlobalStateContext.Provider value={state}>
      <AppGlobalDispatchContext.Provider value={dispatch}>
        {children}
      </AppGlobalDispatchContext.Provider>
    </AppGlobalStateContext.Provider>
  )
}

const useAppGlobal = () => {
  const state = useContext(AppGlobalStateContext)
  const dispatch = useContext(AppGlobalDispatchContext)

  if (!state || !dispatch) {
    throw new Error('useAppGlobal must be used within AppGlobalProvider')
  }

  return {
    state,
    dispatch
  }
}

export { AppGlobalProvider, useAppGlobal, AppReducerAction }
