/**
 * 404 页面 - 页面不存在
 */

import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-blue-500 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">页面未找到</h1>
        <p className="text-lg text-gray-600 mb-8">抱歉，您访问的页面不存在或已被删除</p>
        <Button onClick={() => navigate('/chanxueyan/')}>
          返回首页
        </Button>
      </div>
    </div>
  );
}