/**
 * 后台管理 - Dashboard
 */

import { Card, CardHeader, CardTitle, CardContent } from '../../components/Card';

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">管理后台</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500">1,234</div>
              <p className="text-gray-600 mt-2">总用户数</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-500">567</div>
              <p className="text-gray-600 mt-2">问题总数</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500">890</div>
              <p className="text-gray-600 mt-2">回答总数</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-500">45</div>
              <p className="text-gray-600 mt-2">今日活跃</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}