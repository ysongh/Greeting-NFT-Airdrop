import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Image, Input, Button, Upload } from 'antd';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import GreetingNFT from '../../../abis/GreetingNFT.json';

function claimnft() {
  const router = useRouter();
  const { id } = router.query;

  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(GreetingNFT.networks[5777].address, GreetingNFT.abi, signer);
      const greetingData = await contract.greetings(id);
      console.log(greetingData);
      setImageUrl(greetingData.imageURL);
      setMessage(greetingData.message);
    }

    if(id) loadData();
  }, [id])

  const claimNFTandMint = async () => {
    const res = await fetch('/api/mintnft', {
      method: 'POST',
      body: JSON.stringify({
        imageUrl,
        message
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const tx = await res.json();
    console.log(tx);
  }

  return (
    <div className="center-content">
      <Card title="Claim Greeting NFT" style={{ maxWidth: '400px' }}>
        <Image
          width={'100%'}
          src={imageUrl}
        />
        <p>{message}</p>
        <Button type="primary" block onClick={claimNFTandMint}>Claim</Button>
      </Card>
    </div>
  )
}

export default claimnft
