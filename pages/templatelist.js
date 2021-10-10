import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Card, Button, Typography } from 'antd';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import GreetingNFT from '../abis/GreetingNFT.json';

function TemplateList({ userWalletAddress, setGreetingURL }) {
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
    loadData();
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
              cover={<img alt="Greeting Card" src={template.imageURL} />}
            >
              <Card.Meta title={template.title} description={`${ethers.utils.formatUnits(template.price.toString(), 'ether')} ETH`} />
              <br />
              <Button type="primary" block onClick={() => selectTemplate(template.imageURL)}>
                Select
              </Button>
            </Card>
          </Col>
        ))}
        {!templateList.length
          && <Typography.Title level={5} type="danger">
              Connect to your wallet
            </Typography.Title>
        }
      </Row>
    </div>
  )
}

export default TemplateList;
