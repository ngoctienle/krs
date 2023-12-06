/* eslint-disable import/no-named-as-default */
import { Layout } from 'antd'

import styled from 'styled-components'

export const StyledLayoutContent = styled(Layout.Content)`
  overflow: hidden auto;
  max-height: calc(100vh - 149px);
`

export const StyledContainer = styled.div.attrs({ className: 'space-y-5' })`
  padding: 16px 24px;
`
