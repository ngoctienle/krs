import type { FC, ReactElement } from 'react'
import type { RouteProps } from 'react-router-dom'

import { useIntl } from 'react-intl'

interface WrapperRouterProps extends Omit<RouteProps, 'element'> {
  titleId: string
  element: ReactElement
}

const WrapperRouteComponent: FC<WrapperRouterProps> = ({ titleId, element }) => {
  const { formatMessage } = useIntl()

  if (titleId) {
    document.title = formatMessage({ id: titleId })
  }

  return element
}

export default WrapperRouteComponent
