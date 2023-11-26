import { useContext, useCallback } from 'react'

import { ResourceContext } from '@module/contexts/resource'
import { IResourceItem } from '@module/interfaces'
import { pickResource } from '@module/definitions'

export type UseResourceWithRouteReturnType = (route: string) => IResourceItem

/**
 * @deprecated Use `useResource` hook instead.
 * @internal This hook is for internal use only. And is kept for backward compatibility.
 */
export const useResourceWithRoute = (): UseResourceWithRouteReturnType => {
  const { resources } = useContext(ResourceContext)

  const resourceWithRoute = useCallback(
    (route: string) => {
      const picked = pickResource(route, resources, true)
      if (picked) {
        return picked
      }
      return { name: route, route: route } as IResourceItem
    },
    [resources]
  )

  return resourceWithRoute
}
