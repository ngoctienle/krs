import React, { useEffect, useState } from 'react'
import cx from 'classnames'
import { useIsMounted } from '@module/hooks/use-is-mounted'

type SocialMediaShareCountProps = Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'children'
> & {
  children?: (shareCount: number) => React.ReactNode
  getCount: (url: string, callback: (shareCount?: number) => void) => void
  url: string
}

export const SocialMediaShareCount = ({
  children = (shareCount: number) => shareCount,
  className,
  getCount,
  url,
  ...rest
}: SocialMediaShareCountProps) => {
  const isMounted = useIsMounted()
  const [count, setCount] = useState<number | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    getCount(url, (count) => {
      if (isMounted()) {
        setCount(count)
        setIsLoading(false)
      }
    })
  }, [url])

  return (
    <span className={cx('react-share__ShareCount', className)} {...rest}>
      {!isLoading && count !== undefined && children(count)}
    </span>
  )
}

export const createShareCount = (
  getCount: SocialMediaShareCountProps['getCount']
) => {
  const ShareCount = (props: Omit<SocialMediaShareCountProps, 'getCount'>) => (
    <SocialMediaShareCount getCount={getCount} {...props} />
  )

  ShareCount.displayName = `ShareCount(${getCount.name})`

  return ShareCount
}
