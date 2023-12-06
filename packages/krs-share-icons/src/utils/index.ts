export const isPromise = (obj: any): obj is Promise<unknown> =>
  !!obj &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof obj.then === 'function'

export const getBoxPositionOnWindowCenter = (
  width: number,
  height: number
) => ({
  left:
    window.outerWidth / 2 +
    (window.screenX || window.screenLeft || 0) -
    width / 2,
  top:
    window.outerHeight / 2 +
    (window.screenY || window.screenTop || 0) -
    height / 2
})

export const getBoxPositionOnScreenCenter = (
  width: number,
  height: number
) => ({
  top: (window.screen.height - height) / 2,
  left: (window.screen.width - width) / 2
})

export const windowOpen = (
  url: string,
  {
    height,
    width,
    ...configRest
  }: { height: number; width: number; [key: string]: any },
  onClose?: (dialog: Window | null) => void
) => {
  const config: { [key: string]: string | number } = {
    height,
    width,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes',
    ...configRest
  }

  const shareDialog = window.open(
    url,
    '',
    Object.keys(config)
      .map((key) => `${key}=${config[key]}`)
      .join(', ')
  )

  if (onClose) {
    const interval = window.setInterval(() => {
      try {
        if (shareDialog === null || shareDialog.closed) {
          window.clearInterval(interval)
          onClose(shareDialog)
        }
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e)
        /* eslint-enable no-console */
      }
    }, 1000)
  }

  return shareDialog
}

class AssertionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AssertionError'
  }
}

export const assert = (value: any, message: string) => {
  if (!value) {
    throw new AssertionError(message)
  }
}

export const objectToGetParams = (object: {
  [key: string]: string | number | undefined | null
}) => {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )

  return params.length > 0 ? `?${params.join('&')}` : ''
}
