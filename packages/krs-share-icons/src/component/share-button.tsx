import React, { Ref } from 'react'
import cx from 'classnames'

import {
  getBoxPositionOnScreenCenter,
  getBoxPositionOnWindowCenter,
  isPromise,
  windowOpen
} from '@module/utils'

interface CustomProps<LinkOptions> {
  children: React.ReactNode
  className?: string
  /** Disables click action and adds `disabled` class */
  disabled?: boolean
  /**
   * Style when button is disabled
   * @default { opacity: 0.6 }
   */
  disabledStyle?: React.CSSProperties
  forwardedRef?: Ref<HTMLButtonElement>
  networkName: string
  networkLink: NetworkLink<LinkOptions>
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, link: string) => void
  openShareDialogOnClick?: boolean
  opts: LinkOptions
  /**
   * URL of the shared page
   */
  url: string
  style?: React.CSSProperties
  windowWidth?: number
  windowHeight?: number
  windowPosition?: WindowPosition
  /**
   *  Takes a function that returns a Promise to be fulfilled before calling
   * `onClick`. If you do not return promise, `onClick` is called immediately.
   */
  beforeOnClick?: () => Promise<void> | void
  /**
   * Takes a function to be called after closing share dialog.
   */
  onShareWindowClose?: () => void
  resetButtonStyle?: boolean
}

export type Props<LinkOptions extends Record<string, unknown>> = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  keyof CustomProps<LinkOptions>
> &
  CustomProps<LinkOptions>

export function ShareButton<LinkOptions extends Record<string, unknown>>({
  beforeOnClick,
  children,
  className,
  disabled,
  disabledStyle = { opacity: 0.6 },
  forwardedRef,
  networkLink,
  networkName,
  onClick,
  onShareWindowClose,
  openShareDialogOnClick = true,
  opts,
  resetButtonStyle = true,
  style,
  url,
  windowHeight = 400,
  windowPosition = 'windowCenter',
  windowWidth = 550,
  ...rest
}: Props<LinkOptions>) {
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const link = networkLink(url, opts)

    if (disabled) {
      return
    }

    event.preventDefault()

    if (beforeOnClick) {
      const returnVal = beforeOnClick()

      if (isPromise(returnVal)) {
        await returnVal
      }
    }

    if (openShareDialogOnClick) {
      const windowConfig = {
        height: windowHeight,
        width: windowWidth,
        ...(windowPosition === 'windowCenter'
          ? getBoxPositionOnWindowCenter(windowWidth, windowHeight)
          : getBoxPositionOnScreenCenter(windowWidth, windowHeight))
      }

      windowOpen(link, windowConfig, onShareWindowClose)
    }

    if (onClick) {
      onClick(event, link)
    }
  }

  const newClassName = cx(
    'react-share__ShareButton',
    {
      'react-share__ShareButton--disabled': !!disabled,
      disabled: !!disabled
    },
    className
  )

  const newStyle = resetButtonStyle
    ? {
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        font: 'inherit',
        color: 'inherit',
        cursor: 'pointer',
        ...style,
        ...(disabled && disabledStyle)
      }
    : {
        ...style,
        ...(disabled && disabledStyle)
      }

  return (
    <button
      {...rest}
      className={newClassName}
      onClick={handleClick}
      ref={forwardedRef}
      style={newStyle}>
      {children}
    </button>
  )
}
