import { Card, Form, Input, Button } from 'antd'

export default function SendGreeting() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
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
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
