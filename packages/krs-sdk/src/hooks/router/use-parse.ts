import React, { useContext } from 'react'

import { RouterBindingsContext } from '@module/contexts/router'
import { ParseFunction, ParseResponse } from '@module/interfaces'

type UseParseType = () => <
  TParams extends Record<string, any> = Record<string, any>
>() => ParseResponse<TParams>

export const useParse: UseParseType = () => {
  const bindings = useContext(RouterBindingsContext)

  const useParse = React.useMemo(
    () =>
      bindings?.parse ??
      (() =>
        (() => {
          return {}
        }) as ParseFunction),
    [bindings?.parse]
  )

  const parse = useParse()

  return parse as ReturnType<UseParseType>
}
