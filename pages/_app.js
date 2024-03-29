import React, { useState } from 'react'
import { Layout, Alert } from 'antd'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import '../styles/globals.css'
import "antd/dist/antd.css"

import Head from '../components/layout/Header'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

function MyApp({ Component, pageProps }) {
  const [headerTitle, setHeaderTitle] = useState("Greeting NFT Airdrop")
  const [userWalletAddress, setUserWalletAddress] = useState("");
  const [greetingURL, setGreetingURL] = useState("");

  const connectWallet = async () => {
    setUserWalletAddress("");
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);  
    console.log(provider);

    const { chainId } = await provider.getNetwork();
    console.log(chainId);

    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();
    setUserWalletAddress(walletAddress);
  }

  return (
    <div>
      <Head title={headerTitle} />
      <Navbar
        userWalletAddress={userWalletAddress}
        connectWallet={connectWallet}
        setHeaderTitle={setHeaderTitle} />
      <Layout.Content style={{ padding: '10px 50px 20px 50px', minHeight: '82vh' }}>
        <Alert
          message="Contract is deployed on Rinkeby Test Network"
          type="info"
          closable
        />
        <br />
        <Component
          {...pageProps}
          userWalletAddress={userWalletAddress}
          greetingURL={greetingURL}
          connectWallet={connectWallet}
          setGreetingURL={setGreetingURL} />
      </Layout.Content>      
      <Footer />
    </div>
  )
}

export default MyApp
