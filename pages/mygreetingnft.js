import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Divider } from 'antd';

function MyGreetingnft({ userWalletAddress }) {
  const [userNFTs, setUserNFTs] = useState([]);

  useEffect(() => {
    async function getUserNFT() {
      const res = await fetch(`/api/getusernft/${userWalletAddress}`);
      const { msg } = await res.json();
      console.log(msg);
      console.log(msg.items[0].nft_data);
      setUserNFTs(msg.items[0].nft_data);
    }
    if(userWalletAddress) getUserNFT();
  }, [userWalletAddress])

  return (
    <div>
      <Typography.Title level={1}>
        Your Greeting Card NFTs
      </Typography.Title>

      {!userNFTs.length
        && <Typography.Title level={5} type="danger">
            Connect to your wallet
          </Typography.Title>
      }

      <Divider orientation="left">Polygon Mainnet</Divider>

      <Row gutter={[16, 16]}>
        {userNFTs.map(nft => (
          <Col xs={24} sm={12} md={8} lg={6} key={nft.token_id}>
            <Card
              hoverable
              cover={<img alt="Greeting Card" src={nft.external_data.image} />}
            >
              <Card.Meta title={nft.external_data.name} description={nft.external_data.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default MyGreetingnft;