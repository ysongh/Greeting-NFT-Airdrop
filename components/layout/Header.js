import Head from 'next/head'

function Header({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="manifest" href="/manifest.json" />
      <meta name="description" content="A dapp where users can send a NFT of Greeting Card to someone via email" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Header
