import { AppLocaleType, LayoutTheme, LayoutWidth } from './common'

export interface KRSPersist {
  app_language: AppLocaleType
  device: LayoutWidth
  collapsed: boolean
  theme: LayoutTheme
  user_id: number | null
  token: string | null
  refresh_token: string | null
}
