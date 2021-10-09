import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import GreetingNFT from '../../abis/GreetingNFT.json';

function SendNFTByEmailForm() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);  
    const signer = provider.getSigner();

    let contract = new ethers.Contract(GreetingNFT.networks[5777].address, GreetingNFT.abi, signer);
    let transaction = await contract.addGreeting(values.email, values.title, values.message, values.imageURL);
    let tx = await transaction.wait();
    console.log(tx);
    let data = tx.events[0].args;
    console.log(data);
    sendEmail(data);
  };

  const sendEmail = async data => {
    const res = await fetch('/api/sendemail', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        imageURL: data.imageURL,
        title: data.title,
        message: data.message,
        greetingId: data.greetingId.toString()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(res);
    openNotification(data.email);
  }

  const openNotification = email => {
    notification.open({
      message: 'Success',
      description: 'Email was sent to ' + email,
      duration: 0
    });
  };

  return (
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

      <Form.Item>
        <Button type="primary" htmlType="submit" block icon={<SendOutlined />}>
          Send
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SendNFTByEmailForm;
