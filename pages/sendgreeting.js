import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import GreetingNFT from '../abis/GreetingNFT.json';

export default function SendGreeting() {
  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState('');

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = async (values) => {
    console.log(values);
    console.log(imageUrl);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);  
    const signer = provider.getSigner();

    let contract = new ethers.Contract(GreetingNFT.networks[5777].address, GreetingNFT.abi, signer);
    let transaction = await contract.addGreeting(values.email, values.message, values.imageURL);
    let tx = await transaction.wait();
    console.log(tx);
    let data = tx.events[0].args;
    console.log(data);
    sendEmail(data);

    //sendNFTWithNFTPort(values.upload);
  };

  const sendEmail = async data => {
    const res = await fetch('/api/sendemail', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        imageURL: data.imageURL,
        message: data.message,
        greetingId: data.greetingId.toString()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(res);
  }

  const sendNFTWithNFTPort = async image => {
    const form = new FormData();
    form.append('file', image[0].originFileObj);

    const options = {
      method: 'POST',
      body: form,
      headers: {
        "Authorization": process.env.NEXT_PUBLIC_NFTPORT_APIKEY,
      },
    };

    fetch("https://api.nftport.xyz/easy_mint?" + new URLSearchParams({
      chain: 'polygon',
      name: "Test",
      description: "It works",
      mint_to_address: "0xd173313a51f8fc37bcf67569b463abd89d81844f",
    }), options)
      .then(function(response) { return response.json() })
      .then(function(responseJson) {
        // Handle the response
        console.log(responseJson);
      })
  }

  return (
    <div className="center-content">
      <Card title="Send Greeting NFT" style={{ minWidth: '400px' }}>
        <Form form={form} layout="vertical" name="control-hooks" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Recipient Email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
              name="message"
              label="Message"
              rules={[
                {
                  required: true,
                },
              ]}
            >
            <Input.TextArea rows={5} />
          </Form.Item>

          <Form.Item
            name="imageURL"
            label="Greeting URL"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input />
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
            <Button type="primary" htmlType="submit" block icon={<SendOutlined />}>
              Send
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
