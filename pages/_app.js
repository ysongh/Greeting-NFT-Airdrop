import '../styles/globals.css'
import "antd/dist/antd.css"

import Head from '../components/Header'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head />
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
