import React from 'react';
import { Result, Button } from 'antd';
import { WalletOutlined } from '@ant-design/icons';

function ConnectWalletInfo({ connectWallet }) {
  return (
    <Result
      icon={<WalletOutlined />}
      title="Connect to your wallet"
      subTitle={<a href={`https://metamask.io/download.html`} target="_blank" rel="noopener noreferrer">You can use Metamask (virtual Ethereum wallet)</a>}
      extra={<Button type="primary" size="large" onClick={connectWallet}>Connect</Button>}
    />
  )
}

export default ConnectWalletInfo;
