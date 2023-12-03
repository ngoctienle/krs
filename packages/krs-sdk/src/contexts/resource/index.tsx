import React from 'react'

import { IResourceItem, ResourceProps } from '@module/interfaces'
import { IResourceContext } from './resource.type'

export const ResourceContext = React.createContext<IResourceContext>({
  resources: []
})

export const ResourceContextProvider: React.FC<
  React.PropsWithChildren<{ resources: ResourceProps[] }>
> = ({ resources: providedResources, children }) => {
  const resources: IResourceItem[] = useDeepMemo(() => {
    return legacyResourceTransform(providedResources ?? [])
  }, [providedResources])

  return (
    <ResourceContext.Provider value={{ resources }}>
      {children}
    </ResourceContext.Provider>
  )
}
