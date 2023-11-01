export enum LayoutWidth {
  Desktop = 'desktop',
  Mobile = 'mobile',
  Tablet = 'tablet'
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
