/* eslint-disable react-refresh/only-export-components */
import type { FC } from 'react'
import {
  FormattedMessage,
  useIntl,
  type IntlShape,
  type MessageDescriptor
} from 'react-intl'

import en_US from './en-US'
import vi_VN from './vi-VN'

export const localeConfig = {
  en_US,
  vi_VN
}

export type Id = keyof (typeof localeConfig)['en_US']
interface Props extends MessageDescriptor {
  id: Id
}

export const LocaleFormatter: FC<Props> = ({ ...restProps }) => {
  const notChildProps = {
    ...restProps,
    children: undefined
  }
  return <FormattedMessage {...notChildProps} id={restProps.id} />
}

type FormatMessageProps = (descriptor: Props) => string
type UseLocaleReturn = Omit<IntlShape, 'formatMessage'> & {
  formatMessage: FormatMessageProps
}
export const useLocale = (): UseLocaleReturn => {
  const { formatMessage: _formatMessage, ...rest } = useIntl()
  const formatMessage: FormatMessageProps = _formatMessage

  return {
    ...rest,
    formatMessage
  }
}
