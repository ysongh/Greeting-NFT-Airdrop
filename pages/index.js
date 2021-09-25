import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Greeting NFT Airdrop</title>
        <meta name="description" content="A dapp where users can send a NFT of Greeting Card to someone via email" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Greeting NFT Airdrop</h1>
    </div>
  )
}
