import { useRouter } from 'next/router';
import { Row, Col, Typography, Card, Button } from 'antd';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  return (
    <div>
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
      <Row gutter={16} style={{ marginTop: '3rem'}}>
        <Col className="gutter-row" xs={24} md={8} style={{ padding: '2rem'}}>
          <Card>
            <Card.Meta title="Fast Delivery" description="Send Greeting Card to anyone via email" />
          </Card>
        </Col>
        <Col className="gutter-row" xs={24} md={8} style={{ padding: '2rem'}}>
          <Card>
            <Card.Meta title="Free NFT" description="NFT of Greeting Card can be minted for free on Polygon Mainnet" />
          </Card>
        </Col>
        <Col className="gutter-row" xs={24} md={8} style={{ padding: '2rem'}}>
          <Card>
            <Card.Meta title="Greeting Card List" description="You can select a Greeting Card to use from designers" />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
