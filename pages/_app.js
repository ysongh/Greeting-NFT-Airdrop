import { Layout } from 'antd'

import '../styles/globals.css'
import "antd/dist/antd.css"

import Head from '../components/Header'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head />
      <Navbar />
      <Layout.Content style={{ padding: '20px 50px' }}>
        <Component {...pageProps} />
      </Layout.Content>      
    </div>
  )
}

export default MyApp
