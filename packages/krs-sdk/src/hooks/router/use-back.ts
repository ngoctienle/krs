import React, { useContext } from 'react'

import { RouterBindingsContext } from '@module/contexts/router'

export const useBack = () => {
  const bindings = useContext(RouterBindingsContext)

  const useBack = React.useMemo(
    () => bindings?.back ?? (() => () => undefined),
    [bindings?.back]
  )
  const back = useBack()

  return back
}
