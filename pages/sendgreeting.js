import React, { useState } from 'react';
import { Card, Radio, Space, Typography, Divider } from 'antd';

import SendNFTByEmailForm from '../components/forms/SendNFTByEmailForm';
import SendNFTByAddressForm from '../components/forms/SendNFTByAddressForm';

export default function SendGreeting() {
  const [type, setType] = useState(1);

  const onChange = e => {
    setType(e.target.value);
  };

  return (
    <div className="center-content">
      <Card title="Send Greeting NFT" style={{ minWidth: '500px' }}>
        <Typography.Paragraph level={5}>
          Send NFT by:
        </Typography.Paragraph>
        <Radio.Group onChange={onChange} value={type}>
          <Radio value={1}>By Email</Radio>
          <Radio value={2}>By Wallet Address</Radio>
        </Radio.Group>

        <Divider />

        {type === 1
          ? <SendNFTByEmailForm />
          : <SendNFTByAddressForm />
        }
      </Card>
    </div>
  )
}
