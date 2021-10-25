import React, { useState } from 'react';
import { Form, Input, Button, Upload, Typography, Spin } from 'antd';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';

function SendNFTByAddressForm() {
  const [form] = Form.useForm();

  const [transactionLink, setTransactionLink] = useState('');
  const [loading, setLoading] = useState(false);

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = async (values) => {
    console.log(values);

    sendNFTWithNFTPort(values);
  };

  const sendNFTWithNFTPort = async values => {
    try{
      setLoading(true);
      const form = new FormData();
      form.append('file', values.upload[0].originFileObj);

      const options = {
        method: 'POST',
        body: form,
        headers: {
          "Authorization": process.env.NEXT_PUBLIC_NFTPORT_APIKEY,
        },
      };

      const tx = await fetch("https://api.nftport.xyz/easy_mint?" + new URLSearchParams({
        chain: 'polygon',
        name: "Greeting Card",
        description: values.message,
        mint_to_address: values.address,
      }), options)

      const txData = await tx.json();
      setTransactionLink(txData.transaction_external_url);
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <Form form={form} layout="vertical" name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="address"
        label="Wallet Address"
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
        <Spin spinning={loading}>
          <Button type="primary" htmlType="submit" block icon={<SendOutlined />}>
            Send
          </Button>
        </Spin>
      </Form.Item>

      {transactionLink && 
          <Typography.Title level={5} type="danger">
            Success, <a href={transactionLink} target="_blank" rel="noopener noreferrer">
              Transaction Details
            </a>
          </Typography.Title>}
    </Form>
  )
}

export default SendNFTByAddressForm;
