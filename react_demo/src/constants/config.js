/**
 * 应用配置
 */

export const API_BASE_URL = 'http://localhost:8899';

export const API_ENDPOINTS = {
  // 认证相关
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',
  GET_PROFILE: '/auth/profile',

  // 用户相关
  GET_USERS: '/user/list',
  GET_USER: '/user/:id',
  UPDATE_USER: '/user/:id',
  DELETE_USER: '/user/:id',
  GET_MY_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',

  // 问答相关
  GET_QUESTIONS: '/qa/questions',
  GET_QUESTION: '/qa/questions/:id',
  CREATE_QUESTION: '/qa/questions',
  UPDATE_QUESTION: '/qa/questions/:id',
  DELETE_QUESTION: '/qa/questions/:id',
  GET_ANSWERS: '/qa/questions/:questionId/answers',
  CREATE_ANSWER: '/qa/questions/:questionId/answers',
  UPDATE_ANSWER: '/qa/answers/:id',
  DELETE_ANSWER: '/qa/answers/:id',

  // 管理相关
  GET_ANALYTICS: '/admin/analytics',
  GET_SYSTEM_SETTINGS: '/admin/settings',
  UPDATE_SYSTEM_SETTINGS: '/admin/settings',
};

// 本地存储键
export const STORAGE_KEYS = {
  TOKEN: 'app_token',
  USER: 'app_user',
  AUTH_CONTEXT: 'app_auth_context',
};

// HTTP 超时时间（毫秒）
export const HTTP_TIMEOUT = 10000;

// Token 刷新时间差（提前 5 分钟刷新）
export const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000;