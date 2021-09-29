import '../styles/globals.css'
import "antd/dist/antd.css"

import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
