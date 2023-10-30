export enum LayoutWidth {
  Desktop = 'desktop',
  Mobile = 'mobile',
  Tablet = 'tablet'
}
export type LayoutWidthType = keyof typeof LayoutWidth

export enum LayoutTheme {
  Light = 'light',
  Dark = 'dark'
}
export type LayoutThemeType = (typeof LayoutTheme)[keyof typeof LayoutTheme]
