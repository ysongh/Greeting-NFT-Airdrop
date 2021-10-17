import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Layout, Menu, Button } from 'antd';

function Navbar({ userWalletAddress, connectWallet }) {
  return (
    <Layout.Header className="primary-bg-color" style={{ display: 'flex', alignItems: 'center' }}>
      <Image
        className="logo"
        src="/logo.svg"
        alt="Logo"
        width="130"
        height="130" />
      <Menu className="primary-bg-color" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 2 }}>
        <Menu.Item key="1">
          <Link href="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/templatelist">
            Template List
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link href="/uploadtemplate">
            Upload Template
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link href="/sendgreeting">
            Send Greeting
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link href="/mygreetingnft">
            My Greeting NFTs
          </Link>
        </Menu.Item>
      </Menu>
      <Button
          type="primary"
          onClick={connectWallet}
        >
          {userWalletAddress ? userWalletAddress.substring(0,8) + "..." + userWalletAddress.substring(34,42) : "Connect to Wallet"}
        </Button>
    </Layout.Header>
  )
}

export default Navbar
