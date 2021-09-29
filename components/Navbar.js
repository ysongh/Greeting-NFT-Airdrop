import Link from 'next/link'
import { Layout, Button } from 'antd'

function Navbar() {
  return (
    <Layout.Header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Link href="/">
          Greeting NFT Airdrop
        </Link>
        <Button
          type="primary"
        >
          Connect to Wallet
        </Button>
      </div>
     
    </Layout.Header>
  )
}

export default Navbar
