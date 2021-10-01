import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined, SendOutlined } from '@ant-design/icons';

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
  };

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
            name="upload"
            label="Upload a Greeting Card"
            rules={[
              {
                required: true,
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
