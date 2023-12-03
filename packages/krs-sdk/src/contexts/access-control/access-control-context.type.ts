import { BaseKey, IResourceItem, ITreeMenu } from '@module/interfaces'

export type CanParams = {
  /**
   * Resource name for API data interactions
   */
  resource?: string
  /**
   * Intended action on resource
   */
  action: string
  /**
   * Parameters associated with the resource
   */
  params?: {
    resource?: IResourceItem & { children?: ITreeMenu[] }
    id?: BaseKey
    [key: string]: any
  }
}

export type CanReturnType = {
  can: boolean
  reason?: string
}

export interface IAccessControlContext {
  can?: ({ resource, action, params }: CanParams) => Promise<CanReturnType>
  options?: {
    buttons?: {
      enableAccessControl?: boolean
      hideIfUnauthorized?: boolean
    }
  }
}

export interface IAccessControlContextReturnType {
  can?: ({ resource, action, params }: CanParams) => Promise<CanReturnType>
  options: {
    buttons: {
      enableAccessControl?: boolean
      hideIfUnauthorized?: boolean
    }
  }
}

export type AccessControlProvider = Partial<IAccessControlContext> &
  Required<Pick<IAccessControlContext, 'can'>>
