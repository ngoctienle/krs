import { Fragment } from 'react'
import { Button, Card, Flex, Space, Typography, theme as antTheme } from 'antd'
import { Icons } from 'src/components/core'

interface ISystemPageProps {}

const { Text, Title } = Typography

const SystemPage: React.FC<ISystemPageProps> = () => {
  const token = antTheme.useToken()

  return (
    <Fragment>
      <Flex justify='space-between'>
        <Flex vertical gap={4}>
          <Flex gap={8} align='center'>
            <Title level={5} style={{ margin: 0 }}>
              Settings
            </Title>
            <Icons.Minus size={16} color={token.token.colorTextBase} />
            <Title level={5} style={{ margin: 0 }}>
              System Setting
            </Title>
          </Flex>
          <Flex gap={4} align='center'>
            <Text
              type='secondary'
              style={{
                fontSize: 12
              }}>
              Home
            </Text>
            <Icons.Minus size={16} color={token.token.colorTextSecondary} />
            <Text
              type='secondary'
              style={{
                fontSize: 12
              }}>
              Settings
            </Text>
          </Flex>
        </Flex>
        <Space>
          <Button>Filter</Button>
          <Button type='primary'>Create</Button>
        </Space>
      </Flex>
      <Card>Hello</Card>
      <Card>Hello 2</Card>
    </Fragment>
  )
}

export default SystemPage
