import { IconsType } from 'src/components/core/icons'
import { Id } from 'src/locales'

export enum LayoutWidth {
  Desktop = 'desktop',
  Mobile = 'mobile'
}
export type LayoutWidthType = (typeof LayoutWidth)[keyof typeof LayoutWidth]

export enum LayoutTheme {
  Light = 'light',
  Dark = 'dark'
}
export type LayoutThemeType = (typeof LayoutTheme)[keyof typeof LayoutTheme]

export enum AppLocale {
  VI = 'vi_VN',
  EN = 'en_US'
}
export type AppLocaleType = (typeof AppLocale)[keyof typeof AppLocale]

interface MenuItem {
  key: string
  label: Id
  icon: IconsType
  path: string
  children?: MenuChild[]
}

export type MenuChild = Omit<MenuItem, 'children' | 'icons'>
export type MenuList = MenuItem[]
