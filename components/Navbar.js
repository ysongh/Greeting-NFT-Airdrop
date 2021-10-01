import Link from 'next/link'
import { Layout, Menu, Button } from 'antd'

function Navbar() {
  return (
    <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
        <Menu.Item key="1">
          <Link href="/">
            Greeting NFT Airdrop
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/sendgreeting">
            Send Greeting
          </Link>
        </Menu.Item>
      </Menu>
      <Button
          type="primary"
        >
          Connect to Wallet
        </Button>
    </Layout.Header>
  )
}

export default Navbar
