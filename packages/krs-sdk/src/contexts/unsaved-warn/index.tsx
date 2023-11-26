import React, { ReactNode, useState } from 'react'

import { IUnsavedWarnContext } from './unsaved-warn.type'

export const UnsavedWarnContext = React.createContext<IUnsavedWarnContext>({})

export const UnsavedWarnContextProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [warnWhen, setWarnWhen] = useState(false)

  return (
    <UnsavedWarnContext.Provider value={{ warnWhen, setWarnWhen }}>
      {children}
    </UnsavedWarnContext.Provider>
  )
}
