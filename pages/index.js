import { useRouter } from 'next/router';
import { Row, Col, Typography, Button } from 'antd';
import Image from 'next/image'
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Row gutter={16} style={{ marginTop: '3rem'}}>
        <Col className="gutter-row" xs={24} md={12} style={{ padding: '2rem'}}>
          <Typography.Title level={1}>Airdrop NFT of Greeting Card</Typography.Title>
          <p style={{ fontSize: '16px' }}>
            You can send a NFT of Greeting Catd to someone via email
          </p>
          <Button type="primary" size='large' onClick={() => router.push('/templatelist')}>
            Send Greeting Card
          </Button>
        </Col>
        <Col className="gutter-row" xs={24} md={12}>
          <center>
            <Image
              src="/hero.svg"
              alt="Greeting Card"
              width="300"
              height="300" />
          </center>
        </Col>
      </Row>
    </div>
  )
}
