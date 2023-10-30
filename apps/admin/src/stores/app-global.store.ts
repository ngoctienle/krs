import { LayoutTheme, LayoutThemeType } from 'src/common/interface/common'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AppGlobalState {
  theme: LayoutThemeType
  loading: boolean
}

interface AppGlobalAction {
  setTheme: (theme: LayoutThemeType) => void
  setLoading: (loading: boolean) => void
}

type AppGlobalStore = AppGlobalState & AppGlobalAction

const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? LayoutTheme.Dark : LayoutTheme.Light
const userTheme = localStorage.getItem('theme') as AppGlobalState['theme']

const initialAppGlobalState: AppGlobalState = {
  theme: userTheme || systemTheme,
  loading: false
}

const useAppGlobal = create<AppGlobalStore>()(
  persist(
    (set) => ({
      ...initialAppGlobalState,
      setTheme: (theme: LayoutThemeType) => {
        set({ theme })

        // Side effect for handling theme-mode on the body
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
      },
      setLoading: (loading: boolean) => {
        set({ loading })
      }
    }),
    {
      name: 'app-global',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useAppGlobal
