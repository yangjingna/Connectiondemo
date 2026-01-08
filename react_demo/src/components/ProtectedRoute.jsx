/**
 * ProtectedRoute 组件
 * 保护需要认证或特定权限的路由
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({
  component: Component,
  requireAuth = true,
  requiredRoles = null,
  requiredPermissions = null,
}) {
  const { isAuthenticated, hasRole, hasAnyRole, hasPermission, hasAnyPermission, loading } =
    useAuth();

  // 正在加载认证信息
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  // 检查认证
  if (requireAuth && !isAuthenticated()) {
    return <Navigate to="/chanxueyan/auth/login" replace />;
  }

  // 检查角色
  if (requiredRoles) {
    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
    if (!hasAnyRole(roles)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">403 - 无权访问</h1>
            <p className="mt-2 text-gray-600">你没有权限访问此页面</p>
            <a href="/chanxueyan/auth/login" className="mt-4 inline-block text-blue-500 hover:text-blue-700">
              返回登录
            </a>
          </div>
        </div>
      );
    }
  }

  // 检查权限
  if (requiredPermissions) {
    const permissions = Array.isArray(requiredPermissions)
      ? requiredPermissions
      : [requiredPermissions];
    if (!hasAnyPermission(permissions)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">403 - 无权访问</h1>
            <p className="mt-2 text-gray-600">你没有权限访问此页面</p>
            <a href="/chanxueyan/auth/login" className="mt-4 inline-block text-blue-500 hover:text-blue-700">
              返回登录
            </a>
          </div>
        </div>
      );
    }
  }

  // 如果 Component 是函数，直接调用；否则作为组件渲染
  return typeof Component === 'function' ? Component() : <Component />;
}