import { LayoutWidth } from 'src/common/interface/common'

export default function getGlobalState() {
  const device = /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
    ? LayoutWidth.Mobile
    : LayoutWidth.Desktop
  const collapsed = device !== LayoutWidth.Desktop

  return {
    device,
    collapsed
  } as const
}
