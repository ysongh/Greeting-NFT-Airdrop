import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    const res = await fetch('/api/sendemail', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(res);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Greeting NFT Airdrop</title>
        <meta name="description" content="A dapp where users can send a NFT of Greeting Card to someone via email" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Greeting NFT Airdrop</h1>
      <p>Email</p>
      <input value={email} onChange={(e) => setEmail(e.target.value)}/>
      <button onClick={sendEmail}>Send</button>
    </div>
  )
}
