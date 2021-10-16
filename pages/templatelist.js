import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Card, Button, Typography, Result, Image } from 'antd';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { WalletOutlined } from '@ant-design/icons';

import GreetingNFT from '../abis/GreetingNFT.json';

function TemplateList({ userWalletAddress, setGreetingURL, connectWallet }) {
  const router = useRouter();

  const [count, setCount] = useState(0);
  const [templateList, setTemplateList] = useState([]);

  const selectTemplate = url => {
    setGreetingURL(url);
    router.push('/sendgreeting');
  }

  useEffect(() => {
    const loadData = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const { chainId } = await provider.getNetwork();

      let contract = new ethers.Contract(GreetingNFT.networks[chainId].address, GreetingNFT.abi, signer);
      const num = await contract.templateCount();
      setCount(num);

      let temp = [];
      for(let i = 1; i <= count; i++){
        const template = await contract.templates(i);
        temp.push(template);
      }
      console.log(temp);
      setTemplateList(temp);
    }
    if(userWalletAddress) loadData();
  }, [userWalletAddress])

  return (
    <div>
      <Typography.Title level={1}>
        Select the Greeting Card
      </Typography.Title>

      <Row gutter={[16, 16]}>
        {templateList.map(template => (
          <Col xs={24} sm={12} md={8} lg={6} key={template.templateId.toString()}>
            <Card
              hoverable
              cover={<Image alt="Greeting Card" src={template.imageURL} />}
            >
              <Card.Meta title={template.title} description={`${ethers.utils.formatUnits(template.price.toString(), 'ether')} ETH`} />
              <br />
              <Button type="primary" block onClick={() => selectTemplate(template.imageURL)}>
                Select
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      {!templateList.length
          && <Result
              icon={<WalletOutlined />}
              title="Connect to your wallet"
              subTitle="You can use MetaMask"
              extra={<Button type="primary" size="large" onClick={connectWallet}>Connect</Button>}
            />
        }
    </div>
  )
}

export default TemplateList;
