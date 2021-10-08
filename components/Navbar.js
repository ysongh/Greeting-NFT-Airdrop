import React, { useState } from 'react';
import Link from 'next/link';
import { Layout, Menu, Button } from 'antd';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal'

function Navbar({ setUserWalletAddress }) {
  const [address, setAddress] = useState('');

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);  
    console.log(provider);

    const { chainId } = await provider.getNetwork();
    console.log(chainId);

    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();
    setAddress(walletAddress);
    setUserWalletAddress(walletAddress);
  }

  return (
    <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
        <Menu.Item key="1">
          <Link href="/">
            Greeting NFT Airdrop
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
      </Menu>
      <Button
          type="primary"
          onClick={connectWallet}
        >
          {address ? address : "Connect to Wallet"}
        </Button>
    </Layout.Header>
  )
}

export default Navbar
