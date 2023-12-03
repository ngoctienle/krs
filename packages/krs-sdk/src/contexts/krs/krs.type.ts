import React, { ReactNode } from 'react'
import { QueryClientConfig, QueryClient } from '@tanstack/react-query'

import {
  MutationMode,
  TitleProps,
  LayoutProps,
  LiveModeProps,
  RedirectAction,
  TextTransformers
} from '@module/interfaces'

export interface IKrsOptions {
  breadcrumb?: ReactNode
  mutationMode?: MutationMode
  syncWithLocation?: boolean
  warnWhenUnsavedChanges?: boolean
  undoableTimeout?: number
  liveMode?: LiveModeProps['liveMode']
  disableTelemetry?: boolean
  redirect?: {
    afterCreate?: RedirectAction
    afterClone?: RedirectAction
    afterEdit?: RedirectAction
  }
  reactQuery?: {
    clientConfig?: QueryClientConfig | InstanceType<typeof QueryClient>
    /**
     * @deprecated `@tanstack/react-query`'s devtools are removed from the core. Please use the `@tanstack/react-query-devtools` package manually in your project. This option will be removed in the next major version and has no effect on the `@tanstack/react-query-devtools` package usage.
     */
    devtoolConfig?: any | false
  }
  overtime?: UseLoadingOvertimeKrsContext
  textTransformers?: TextTransformers
  /**
   * Disables server-side validation globally for the useForm hook
   * @default false
   * @see {@link https://Krs.dev/docs/advanced-tutorials/forms/server-side-form-validation/}
   */
  disableServerSideValidation?: boolean
  /**
   * The project id of your Krs project. Will be set automatically. Don't modify.
   */
  projectId?: string
  useNewQueryKeys?: boolean
}

export interface IKrsContextOptions {
  breadcrumb?: ReactNode
  mutationMode: MutationMode
  syncWithLocation: boolean
  warnWhenUnsavedChanges: boolean
  undoableTimeout: number
  liveMode: LiveModeProps['liveMode']
  redirect: {
    afterCreate: RedirectAction
    afterClone: RedirectAction
    afterEdit: RedirectAction
  }
  overtime: UseLoadingOvertimeKrsContext
  textTransformers: Required<TextTransformers>
  disableServerSideValidation: boolean
  projectId?: string
  useNewQueryKeys?: boolean
}

export interface IKrsContext {
  hasDashboard: boolean
  mutationMode: MutationMode
  /**
   * @deprecated Please use `UnsavedChangesNotifier` components from router packages instead.
   */
  warnWhenUnsavedChanges: boolean
  syncWithLocation: boolean
  undoableTimeout: number
  catchAll?: React.ReactNode
  DashboardPage?: KrsProps['DashboardPage']
  LoginPage?: React.FC | false
  Title?: React.FC<TitleProps>
  Layout: React.FC<LayoutProps>
  Sider?: React.FC
  Header?: React.FC
  Footer?: React.FC
  OffLayoutArea?: React.FC
  liveMode: LiveModeProps['liveMode']
  onLiveEvent?: LiveModeProps['onLiveEvent']
  options: IKrsContextOptions
}

export interface IKrsContextProvider {
  hasDashboard: boolean
  mutationMode: MutationMode
  warnWhenUnsavedChanges: boolean
  syncWithLocation: boolean
  undoableTimeout: number
  /**
   * @deprecated Please use the `catchAll` element in your routes instead.
   */
  catchAll?: React.ReactNode
  /**
   * @deprecated Please use the `DashboardPage` component in your routes instead.
   */
  DashboardPage?: KrsProps['DashboardPage']
  /**
   * @deprecated Please use the `LoginPage` component in your routes instead.
   */
  LoginPage?: React.FC | false
  /**
   * @deprecated Please pass the `Title` component to your `Layout` component.
   */
  Title?: React.FC<TitleProps>
  /**
   * @deprecated Please use the `Layout` component as a children instead of a prop.
   */
  Layout?: React.FC<LayoutProps>
  /**
   * @deprecated Please pass the `Sider` component to your `Layout` component.
   */
  Sider?: React.FC
  /**
   * @deprecated Please pass the `Header` component to your `Layout` component.
   */
  Header?: React.FC
  /**
   * @deprecated Please pass the `Footer` component to your `Layout` component.
   */
  Footer?: React.FC
  /**
   * @deprecated Please use your `OffLayoutArea` component as a children instead of a prop.
   */
  OffLayoutArea?: React.FC
  liveMode: LiveModeProps['liveMode']
  onLiveEvent?: LiveModeProps['onLiveEvent']
  options: IKrsContextOptions
  children?: ReactNode
}
