import { appSetting } from 'src/common/config/settings'
import { LayoutWidth } from 'src/common/interface/common'

class KRSHelper {
  getGlobalState() {
    const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
      ? LayoutWidth.Mobile
      : LayoutWidth.Desktop
    const collapsed = device !== LayoutWidth.Desktop

    return {
      device,
      collapsed
    } as const
  }
  getMenuCode(path: string) {
    const pathSegments = path.split('/').filter(Boolean)
    const activeSegment = pathSegments[1] || '' // Assuming the first segment after the leading '/' is the key

    const matchingItem = appSetting.menu.find(
      (item) =>
        item.key === activeSegment ||
        (item.children &&
          item.children.some((child) => child.key === activeSegment))
    )

    return matchingItem ? matchingItem.key : appSetting.menu[0].key
  }
}

const krsHelper: KRSHelper = new KRSHelper()
export default krsHelper
