import { AppLocale, LayoutTheme } from 'src/common/interface/common'

enum KeyStorage {
  THEME = 'krs-scheme',
  LOCALE = 'krs-locale'
}

class KRSLocalStorage {
  /* AppTheme */
  storeTheme(theme: LayoutTheme): void {
    this.storageItemToLocalStorage(KeyStorage.THEME, theme)
  }
  getTheme(): LayoutTheme | null {
    const theme = this.getItemFromLocalStorage(KeyStorage.THEME)
    if (Object.values(LayoutTheme).includes(theme as LayoutTheme)) {
      return theme as LayoutTheme
    }
    return null
  }

  /* AppLocale */
  storeLocale(locale: AppLocale): void {
    this.storageItemToLocalStorage(KeyStorage.LOCALE, locale)
  }
  getLocale(): AppLocale {
    const locale = this.getItemFromLocalStorage(KeyStorage.LOCALE)
    if (Object.values(AppLocale).includes(locale as AppLocale)) {
      return locale as AppLocale
    }
    return 'en_US' as AppLocale
  }

  private storageItemToLocalStorage(
    key: (typeof KeyStorage)[keyof typeof KeyStorage],
    value: string
  ): void {
    localStorage.setItem(key, value)
  }
  private getItemFromLocalStorage(
    key: (typeof KeyStorage)[keyof typeof KeyStorage]
  ): string | null {
    return localStorage.getItem(key)
  }
}
const krsStorage: KRSLocalStorage = new KRSLocalStorage()
export default krsStorage
