import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Image, Button, Typography, Spin } from 'antd';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import GreetingNFT from '../../../abis/GreetingNFT.json';

function Claimnft({ userWalletAddress }) {
  const router = useRouter();
  const { id } = router.query;

  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [transactionLink, setTransactionLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const { chainId } = await provider.getNetwork();

      let contract = new ethers.Contract(GreetingNFT.networks[chainId].address, GreetingNFT.abi, signer);
      const greetingData = await contract.greetings(id);
      console.log(greetingData);
      setImageUrl(greetingData.imageURL);
      setTitle(greetingData.title);
      setMessage(greetingData.message);
    }

    if(id) loadData();
  }, [id])

  const claimNFTandMint = async type => {
    try{
      setLoading(true);

      const res = await fetch('/api/mintnft', {
        method: 'POST',
        body: JSON.stringify({
          title,
          imageUrl,
          message,
          type,
          address: userWalletAddress
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const tx = await res.json();
      console.log(tx);
      setLoading(false);
      setTransactionLink(tx.msg.transaction_external_url);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div className="center-content">
      <Card title="Claim Greeting NFT" style={{ maxWidth: '400px' }}>
        <Image
          width={'100%'}
          src={imageUrl}
        />
        <h2>{title}</h2>
        <p>{message}</p>
        {userWalletAddress
          ? 
            <Spin spinning={loading}>
              <Button type="primary" block onClick={() => claimNFTandMint("polygon")}>
                Claim NFT on Polygon Mainnet
              </Button>
              <Button type="secondary" block onClick={() => claimNFTandMint("rinkeby")}>
                Claim NFT on Rinkeby Testnet
              </Button>
            </Spin>
          : <Typography.Title level={5} type="danger">
              Connect to your wallet
            </Typography.Title>
        }
        <br />
        {transactionLink && 
          <Typography.Title level={5} type="danger">
            Success, <a href={transactionLink} target="_blank" rel="noopener noreferrer">
              Transaction Details
            </a>
          </Typography.Title>}
      </Card>
    </div>
  )
}

export default Claimnft
