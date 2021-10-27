import React, { useState } from 'react';
import { Card, Form, Input, Upload, Button, Typography } from 'antd';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';
import { ethers, providers } from "ethers";
import { init } from "@textile/eth-storage";
import Web3Modal from 'web3modal';

import GreetingNFT from '../abis/GreetingNFT.json';

export default function UploadTemplate({ userWalletAddress }) {
  const [form] = Form.useForm();

  const [cid, setCid] = useState("");
  const [loading, setLoading] = useState(false);

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = async (values) => {
    try{
      setLoading(true);
      console.log(values);

      const cid = await addImageToETHStorage(values);
      addTemplate(values, cid);
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  };

  const addImageToETHStorage = async values => {
    // Initialization
    await window.ethereum.enable();
    const provider = new providers.Web3Provider(window.ethereum);
    const wallet = provider.getSigner();
    const storage = await init(wallet);

    // Deposit the fund in order to upload file
    const deposit = await storage.addDeposit();
    console.log(deposit);

    const file = new File([values.upload[0].originFileObj], values.upload[0].name, {
      type: "text/plain",
      lastModified: new Date().getTime()
    });

    const { id, cid } = await storage.store(file);
    console.log(id, cid);
    setCid(cid['/']);

    const { request, deals } = await storage.status(id);
    console.log(request.status_code);
    console.log(deals);

    // Withdraw the fund 
    await storage.releaseDeposit();

    return cid['/'];
  }

  const addTemplate = async (values, cid) => {
    const url = `https://ipfs.io/ipfs/${cid}`;

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);  
    const signer = provider.getSigner();

    const { chainId } = await provider.getNetwork();

    let contract = new ethers.Contract(GreetingNFT.networks[chainId].address, GreetingNFT.abi, signer);
    let transaction = await contract.addTemplate(values.title, ethers.utils.parseUnits(values.price, 'ether'), url);
    let tx = await transaction.wait();
    console.log(tx);
  }

  return (
    <div className="center-content">
      <Card title="Upload Template" style={{ minWidth: '400px' }}>
        <Form form={form} layout="vertical" name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                },
              ]}
            >
            <Input addonAfter="ETH" />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Upload a Greeting Card"
            rules={[
              {
                required: false,
              },
            ]}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="Image Only"
          >
            <Upload name="logo" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            {userWalletAddress
              ? <Button type="primary" htmlType="submit" block icon={<SendOutlined />} loading={loading}>
                  Upload
                </Button>
              : <Typography.Title level={5} type="danger">
                  Connect to your wallet
                </Typography.Title>
            }
          </Form.Item>
        </Form>
        <p>{cid}</p>
      </Card>
    </div>
  )
}
