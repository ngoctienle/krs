/* eslint-disable import/no-named-as-default */
import {
  Button,
  Dropdown,
  Flex,
  Layout,
  Tooltip,
  theme as antTheme
} from 'antd'
import styled from 'styled-components'

import { useLocale } from 'src/locales'
import { AppLocale, LayoutTheme } from 'src/common/interface/common'
import { Icons } from 'src/components/core'
import useKrsStore from 'src/hooks/use-krs-store'

interface IHeaderAppProps {
  collapsed: boolean
  toggle: () => void
}

const { Header } = Layout
const StyledHeader = styled(Header)`
  padding: 0 16px;
`

const HeaderApp: React.FC<IHeaderAppProps> = ({ collapsed, toggle }) => {
  const token = antTheme.useToken()
  const { formatMessage } = useLocale()
  const { persist, setPersist } = useKrsStore((state) => ({
    persist: state.persist,
    setPersist: state.setPersist
  }))
  const { theme, app_language } = persist

  const onToggleTheme = (): void => {
    const newTheme =
      theme === LayoutTheme.Dark ? LayoutTheme.Light : LayoutTheme.Dark
    setPersist({ theme: newTheme })
  }

  const onToggleLng = ({ key }): void => {
    setPersist({ app_language: key })
  }
  return (
    <StyledHeader
      style={{
        backgroundColor: token.token.colorBgContainer
      }}>
      <Flex align='center' justify='space-between' style={{ height: '100%' }}>
        <Button
          type='text'
          shape='default'
          icon={!collapsed ? <Icons.Outdent /> : <Icons.Indent />}
          onClick={toggle}
        />
        <Flex align='center' gap={6}>
          <Tooltip
            title={formatMessage({
              id:
                theme === LayoutTheme.Dark
                  ? 'global.tips.theme.lightTooltip'
                  : 'global.tips.theme.darkTooltip'
            })}>
            <Button
              type='text'
              shape='default'
              icon={
                theme === LayoutTheme.Dark ? (
                  <Icons.Sun size={20} />
                ) : (
                  <Icons.Moon size={20} />
                )
              }
              onClick={onToggleTheme}
            />
          </Tooltip>
          <Dropdown
            menu={{
              onClick: (info) => onToggleLng(info),
              items: [
                {
                  key: 'en_US',
                  icon: <Icons.ENUS size={20} />,
                  disabled: app_language === AppLocale.EN,
                  label: formatMessage({ id: 'global.language.en' })
                },
                {
                  key: 'vi_VN',
                  icon: <Icons.VIVN size={16} />,
                  disabled: app_language === AppLocale.VI,
                  label: formatMessage({ id: 'global.language.vi' })
                }
              ]
            }}>
            <Button
              type='text'
              shape='default'
              icon={<Icons.Languages size={20} />}
            />
          </Dropdown>
        </Flex>
      </Flex>
    </StyledHeader>
  )
}

export default HeaderApp
