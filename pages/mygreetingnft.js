import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Divider, Button, Result, Image, Empty } from 'antd';
import { WalletOutlined } from '@ant-design/icons';

import ConnectWalletInfo from '../components/common/ConnectWalletInfo';

function MyGreetingnft({ userWalletAddress, connectWallet }) {
  const [userNFTs, setUserNFTs] = useState([]);

  useEffect(() => {
    async function getUserNFT() {
      const res = await fetch(`/api/getusernft/${userWalletAddress}`);
      const { msg } = await res.json();
      console.log(msg);
      console.log(msg.items[0].nft_data);
      setUserNFTs(msg.items[0].nft_data || []);
    }
    if(userWalletAddress) getUserNFT();
  }, [userWalletAddress])

  return (
    <div>
      <Typography.Title level={1}>
        Your Greeting Card NFTs
      </Typography.Title>

      {!userWalletAddress && <ConnectWalletInfo connectWallet={connectWallet} />}

      <Divider orientation="left">Polygon Mainnet</Divider>

      <Row gutter={[16, 16]}>
        {userNFTs.map(nft => (
          <Col xs={24} sm={12} md={8} lg={6} key={nft.token_id}>
            <Card
              hoverable
              cover={<Image alt="Greeting Card" src={nft.external_data.image} />}
            >
              <Card.Meta title={nft.external_data.name} description={nft.external_data.description} />
            </Card>
          </Col>
        ))}
      </Row>
      {userWalletAddress && !userNFTs.length && <Empty />}
    </div>
  )
}

export default MyGreetingnft;
