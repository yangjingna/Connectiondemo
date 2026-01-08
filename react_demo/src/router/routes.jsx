/**
 * 路由配置
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { lazy, Suspense } from 'react';

// 公开页面
const LoginPage = lazy(() => import('../pages/Auth/Login'));
const RegisterPage = lazy(() => import('../pages/Auth/Register'));
const HomePage = lazy(() => import('../pages/Home'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

// 受保护页面 - Admin
const AdminDashboard = lazy(() => import('../pages/Admin/Dashboard'));
const AdminUsers = lazy(() => import('../pages/Admin/Users'));
const AdminSettings = lazy(() => import('../pages/Admin/Settings'));

// 受保护页面 - QA
const QAQuestionList = lazy(() => import('../pages/QA/QuestionList'));
const QAQuestionDetail = lazy(() => import('../pages/QA/QuestionDetail'));
const QAPostQuestion = lazy(() => import('../pages/QA/PostQuestion'));

// 受保护页面 - User
const UserProfile = lazy(() => import('../pages/User/Profile'));
const UserMyQuestions = lazy(() => import('../pages/User/MyQuestions'));
const UserMyAnswers = lazy(() => import('../pages/User/MyAnswers'));
const UserSettings = lazy(() => import('../pages/User/Settings'));

// 加载中组件
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">加载中...</p>
      </div>
    </div>
  );
}

/**
 * 创建受保护路由组件
 */
function ProtectedPageWrapper({ Page, requiredRoles = null, requiredPermissions = null }) {
  return (
    <ProtectedRoute
      component={() => (
        <Suspense fallback={<LoadingFallback />}>
          <Page />
        </Suspense>
      )}
      requiredRoles={requiredRoles}
      requiredPermissions={requiredPermissions}
    />
  );
}

/**
 * 创建路由器
 */
export const router = createBrowserRouter([
  // 首页（需要认证）
  {
    path: '/chanxueyan/',
    element: <ProtectedPageWrapper Page={HomePage} />,
  },

  // 认证路由（公开）
  {
    path: '/chanxueyan/auth/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/chanxueyan/auth/register',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <RegisterPage />
      </Suspense>
    ),
  },

  // 后台管理路由（需要 admin 权限）
  {
    path: '/chanxueyan/admin',
    element: <ProtectedPageWrapper Page={AdminDashboard} requiredRoles="admin" />,
  },
  {
    path: '/chanxueyan/admin/users',
    element: <ProtectedPageWrapper Page={AdminUsers} requiredRoles="admin" />,
  },
  {
    path: '/chanxueyan/admin/settings',
    element: <ProtectedPageWrapper Page={AdminSettings} requiredRoles="admin" />,
  },

  // 问答路由（需要认证）
  {
    path: '/chanxueyan/qa',
    element: <ProtectedPageWrapper Page={QAQuestionList} />,
  },
  {
    path: '/chanxueyan/qa/:id',
    element: <ProtectedPageWrapper Page={QAQuestionDetail} />,
  },
  {
    path: '/chanxueyan/qa/post',
    element: <ProtectedPageWrapper Page={QAPostQuestion} />,
  },

  // 用户中心路由（需要认证）
  {
    path: '/chanxueyan/user/profile',
    element: <ProtectedPageWrapper Page={UserProfile} />,
  },
  {
    path: '/chanxueyan/user/my-questions',
    element: <ProtectedPageWrapper Page={UserMyQuestions} />,
  },
  {
    path: '/chanxueyan/user/my-answers',
    element: <ProtectedPageWrapper Page={UserMyAnswers} />,
  },
  {
    path: '/chanxueyan/user/settings',
    element: <ProtectedPageWrapper Page={UserSettings} />,
  },

  // 404 页面
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);