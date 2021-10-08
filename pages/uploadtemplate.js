import React, { useState } from 'react';
import { Card, Form, Input, Upload, Button } from 'antd';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';
import { providers } from "ethers";
import { init } from "@textile/eth-storage";

export default function UploadTemplate() {
  const [form] = Form.useForm();

  const [cid, setCid] = useState("");

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const onFinish = async (values) => {
    console.log(values);

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
  };

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
            <Button type="primary" htmlType="submit" block icon={<SendOutlined />}>
              Upload
            </Button>
          </Form.Item>
        </Form>
        <p>{cid}</p>
      </Card>
    </div>
  )
}
