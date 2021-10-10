import React, { useState } from 'react'
import { Layout } from 'antd'

import '../styles/globals.css'
import "antd/dist/antd.css"

import Head from '../components/Header'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  const [userWalletAddress, setUserWalletAddress] = useState('');
  const [greetingURL, setGreetingURL] = useState('');
  return (
    <div>
      <Head />
      <Navbar setUserWalletAddress={setUserWalletAddress} />
      <Layout.Content style={{ padding: '20px 50px' }}>
        <Component
          {...pageProps}
          userWalletAddress={userWalletAddress}
          greetingURL={greetingURL}
          setGreetingURL={setGreetingURL} />
      </Layout.Content>      
    </div>
  )
}

export default MyApp
