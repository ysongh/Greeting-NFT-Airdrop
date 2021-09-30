import { useState } from 'react';
import { Button } from 'antd';
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
      <h1>Greeting NFT Airdrop</h1>
      <p>Enter Email</p>
      <input value={email} onChange={(e) => setEmail(e.target.value)}/>
      <Button type="primary" onClick={sendEmail}>Send</Button>
    </div>
  )
}
