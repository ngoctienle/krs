import { useContext } from 'react'

import { RouterBindingsContext } from '@module/contexts/router'

export const useLink = () => {
  const bindings = useContext(RouterBindingsContext)

  if (bindings?.Link) {
    return bindings.Link
  }

  const FallbackLink: Required<typeof bindings>['Link'] = ({ to, ...rest }) => (
    <a href={to} {...rest} />
  )

  return FallbackLink
}
