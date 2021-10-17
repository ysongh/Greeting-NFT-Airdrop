import { useRouter } from 'next/router';
import { Result, Button } from 'antd';

export default function Custom404() {
  const router = useRouter();
  
  return <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={() => router.push('/')}>Back Home</Button>}
  />
}