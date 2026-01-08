/**
 * 认证上下文
 * 管理全局的认证状态、用户信息、权限等
 */

import { createContext, useState, useCallback, useEffect } from 'react';
import { authAPI } from '../services/api';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/config';
import { ROLE_PERMISSIONS } from '../constants/permissions';
import { initHttpClient } from '../services/request';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * 初始化认证状态
   * 从 localStorage 恢复之前的认证信息
   */
  useEffect(() => {
    const initAuth = () => {
      try {
        const savedToken = storage.get(STORAGE_KEYS.TOKEN);
        const savedUser = storage.get(STORAGE_KEYS.USER);

        if (savedToken && savedUser) {
          setToken(savedToken);
          setUser(savedUser);
        }
      } catch (err) {
        console.error('Failed to initialize auth', err);
      } finally {
        setLoading(false);
      }
    };

    // 初始化 HTTP 客户端（设置拦截器）
    initHttpClient();

    // 初始化认证状态
    initAuth();
  }, []);

  /**
   * 登录
   */
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      // 🧪 测试账号支持
      if (email === 'admin@qq.com' && password === 'password') {
        const userData = {
          id: 'admin-001',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin',
          permissions: [
            'view_users',
            'create_user',
            'edit_user',
            'delete_user',
            'create_question',
            'edit_question',
            'delete_question',
            'create_answer',
            'edit_answer',
            'delete_answer',
            'manage_system',
            'view_analytics',
          ],
        };
        const token = 'test-token-' + Date.now();

        setToken(token);
        setUser(userData);

        // 保存到 localStorage
        storage.set(STORAGE_KEYS.TOKEN, token);
        storage.set(STORAGE_KEYS.USER, userData);

        return { success: true, user: userData };
      }

      // 🧪 测试账号 - 普通用户
      if (email === 'user' && password === 'password') {
        const userData = {
          id: 'user-001',
          name: 'Test User',
          email: 'user@example.com',
          role: 'user',
          permissions: ['create_question', 'edit_question', 'delete_question', 'create_answer', 'edit_answer', 'delete_answer'],
        };
        const token = 'test-token-' + Date.now();

        setToken(token);
        setUser(userData);

        // 保存到 localStorage
        storage.set(STORAGE_KEYS.TOKEN, token);
        storage.set(STORAGE_KEYS.USER, userData);

        return { success: true, user: userData };
      }

      // 真实 API 调用
      const response = await authAPI.login(email, password);

      if (response.token && response.user) {
        const userData = {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role,
          permissions: response.user.permissions || [],
        };

        setToken(response.token);
        setUser(userData);

        // 保存到 localStorage
        storage.set(STORAGE_KEYS.TOKEN, response.token);
        storage.set(STORAGE_KEYS.USER, userData);

        return { success: true, user: userData };
      }

      throw new Error('Invalid response from server');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || '登录失败';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 注册
   */
  const register = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);

      // 🧪 测试账号支持 - 用 admin 作为用户名注册会自动成为 admin
      if (data.name === 'admin') {
        const userData = {
          id: 'admin-' + Date.now(),
          name: data.name,
          email: data.email,
          role: 'admin',
          permissions: [
            'view_users',
            'create_user',
            'edit_user',
            'delete_user',
            'create_question',
            'edit_question',
            'delete_question',
            'create_answer',
            'edit_answer',
            'delete_answer',
            'manage_system',
            'view_analytics',
          ],
        };
        const token = 'test-token-' + Date.now();

        setToken(token);
        setUser(userData);

        // 保存到 localStorage
        storage.set(STORAGE_KEYS.TOKEN, token);
        storage.set(STORAGE_KEYS.USER, userData);

        return { success: true, user: userData };
      }

      // 🧪 其他用户名注册为普通用户
      const userData = {
        id: 'user-' + Date.now(),
        name: data.name,
        email: data.email,
        role: 'user',
        permissions: ['create_question', 'edit_question', 'delete_question', 'create_answer', 'edit_answer', 'delete_answer'],
      };
      const token = 'test-token-' + Date.now();

      setToken(token);
      setUser(userData);

      // 保存到 localStorage
      storage.set(STORAGE_KEYS.TOKEN, token);
      storage.set(STORAGE_KEYS.USER, userData);

      return { success: true, user: userData };
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || '注册失败';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 登出
   */
  const logout = useCallback(async () => {
    try {
      if (token) {
        // 调用后端登出接口
        await authAPI.logout().catch(() => {
          // 即使请求失败也继续登出
        });
      }
    } finally {
      setToken(null);
      setUser(null);
      storage.remove(STORAGE_KEYS.TOKEN);
      storage.remove(STORAGE_KEYS.USER);
    }
  }, [token]);

  /**
   * 检查用户是否已认证
   */
  const isAuthenticated = useCallback(() => {
    return !!token && !!user;
  }, [token, user]);

  /**
   * 检查用户是否有特定权限
   */
  const hasPermission = useCallback(
    (permission) => {
      if (!user) return false;

      // 如果没有权限列表，从角色权限映射中获取
      if (!user.permissions || user.permissions.length === 0) {
        const rolePerms = ROLE_PERMISSIONS[user.role] || [];
        return rolePerms.includes(permission);
      }

      return user.permissions.includes(permission);
    },
    [user]
  );

  /**
   * 检查用户是否有特定角色
   */
  const hasRole = useCallback(
    (role) => {
      if (!user) return false;
      return user.role === role;
    },
    [user]
  );

  /**
   * 检查用户是否有多个角色中的任意一个
   */
  const hasAnyRole = useCallback(
    (roles) => {
      if (!user) return false;
      return roles.includes(user.role);
    },
    [user]
  );

  /**
   * 检查用户是否有多个权限中的任意一个
   */
  const hasAnyPermission = useCallback(
    (permissions) => {
      if (!user) return false;
      return permissions.some((perm) => hasPermission(perm));
    },
    [user, hasPermission]
  );

  const value = {
    // 状态
    user,
    token,
    loading,
    error,

    // 方法
    login,
    register,
    logout,
    isAuthenticated,
    hasPermission,
    hasRole,
    hasAnyRole,
    hasAnyPermission,

    // 便利方法
    userId: user?.id,
    userName: user?.name,
    userRole: user?.role,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}