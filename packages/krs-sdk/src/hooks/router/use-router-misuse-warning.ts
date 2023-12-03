import React from 'react'

import { RouterBindings } from '@module/interfaces'
import { checkRouterPropMisuse } from '@module/definitions/helpers'

export const useRouterMisuseWarning = (value?: RouterBindings) => {
  const warned = React.useRef(false)

  React.useEffect(() => {
    if (warned.current === false) {
      if (value) {
        const warn = checkRouterPropMisuse(value)
        if (warn) {
          warned.current = true
        }
      }
    }
  }, [value])
}
