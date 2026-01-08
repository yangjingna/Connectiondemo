/**
 * 首页
 */

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';

export default function HomePage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/chanxueyan/auth/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">📚 Chan学研</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">欢迎，{user?.name || '用户'}！</span>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              登出
            </Button>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 个人信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>👤 我的信息</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="text-gray-600">用户名：</span>
                  <span className="font-semibold">{user?.name}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">邮箱：</span>
                  <span className="font-semibold">{user?.email}</span>
                </p>
                <p className="text-sm">
                  <span className="text-gray-600">角色：</span>
                  <span className="font-semibold text-blue-600">
                    {user?.role === 'admin' ? '管理员' : '普通用户'}
                  </span>
                </p>
              </div>
              <Button
                className="w-full mt-4"
                variant="outline"
                size="sm"
                onClick={() => (window.location.href = '/chanxueyan/user/profile')}
              >
                查看完整资料
              </Button>
            </CardContent>
          </Card>

          {/* 问答区卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>💬 问答区</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">在这里提问和回答其他用户的问题。</p>
              <Button
                className="w-full"
                variant="primary"
                size="sm"
                onClick={() => (window.location.href = '/chanxueyan/qa')}
              >
                进入问答区
              </Button>
            </CardContent>
          </Card>

          {/* 用户中心卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>⚙️ 用户中心</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-4">管理你的账户和个人设置。</p>
              <Button
                className="w-full"
                variant="primary"
                size="sm"
                onClick={() => (window.location.href = '/chanxueyan/user/profile')}
              >
                进入用户中心
              </Button>
            </CardContent>
          </Card>

          {/* 管理后台卡片 (仅 admin 显示) */}
          {user?.role === 'admin' && (
            <Card>
              <CardHeader>
                <CardTitle>🛠️ 管理后台</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">管理系统和用户。</p>
                <Button
                  className="w-full"
                  variant="primary"
                  size="sm"
                  onClick={() => (window.location.href = '/chanxueyan/admin')}
                >
                  进入管理后台
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 快速开始指南 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>🚀 快速开始</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-gray-900">1. 浏览问答</h4>
                <p className="text-sm text-gray-600">访问问答区，浏览和回答其他用户的问题。</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">2. 提出问题</h4>
                <p className="text-sm text-gray-600">在问答区发布你的问题，获得帮助。</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">3. 管理账户</h4>
                <p className="text-sm text-gray-600">在用户中心更新你的个人信息和设置。</p>
              </div>
              {user?.role === 'admin' && (
                <div>
                  <h4 className="font-semibold text-gray-900">4. 系统管理</h4>
                  <p className="text-sm text-gray-600">
                    作为管理员，你可以在管理后台管理用户和系统设置。
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}