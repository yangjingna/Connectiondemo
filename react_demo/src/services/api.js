/**
 * API 接口定义
 */

import httpClient from './request';
import { API_ENDPOINTS } from '../constants/config';

/**
 * 认证相关 API
 */
export const authAPI = {
  /**
   * 登录
   */
  login: (email, password) =>
    httpClient.post(API_ENDPOINTS.LOGIN, { email, password }),

  /**
   * 注册
   */
  register: (data) =>
    httpClient.post(API_ENDPOINTS.REGISTER, data),

  /**
   * 刷新 token
   */
  refreshToken: () =>
    httpClient.post(API_ENDPOINTS.REFRESH_TOKEN, {}),

  /**
   * 登出
   */
  logout: () =>
    httpClient.post(API_ENDPOINTS.LOGOUT, {}),

  /**
   * 获取当前用户信息
   */
  getProfile: () =>
    httpClient.get(API_ENDPOINTS.GET_PROFILE),
};

/**
 * 用户相关 API
 */
export const userAPI = {
  /**
   * 获取用户列表
   */
  getUsers: (params) =>
    httpClient.get(API_ENDPOINTS.GET_USERS, { ...params }),

  /**
   * 获取单个用户信息
   */
  getUser: (id) =>
    httpClient.get(API_ENDPOINTS.GET_USER.replace(':id', id)),

  /**
   * 更新用户信息
   */
  updateUser: (id, data) =>
    httpClient.put(API_ENDPOINTS.UPDATE_USER.replace(':id', id), data),

  /**
   * 删除用户
   */
  deleteUser: (id) =>
    httpClient.delete(API_ENDPOINTS.DELETE_USER.replace(':id', id)),

  /**
   * 获取我的资料
   */
  getMyProfile: () =>
    httpClient.get(API_ENDPOINTS.GET_MY_PROFILE),

  /**
   * 更新我的资料
   */
  updateMyProfile: (data) =>
    httpClient.put(API_ENDPOINTS.UPDATE_PROFILE, data),
};

/**
 * 问答相关 API
 */
export const qaAPI = {
  /**
   * 获取问题列表
   */
  getQuestions: (params) =>
    httpClient.get(API_ENDPOINTS.GET_QUESTIONS, { ...params }),

  /**
   * 获取单个问题详情
   */
  getQuestion: (id) =>
    httpClient.get(API_ENDPOINTS.GET_QUESTION.replace(':id', id)),

  /**
   * 创建问题
   */
  createQuestion: (data) =>
    httpClient.post(API_ENDPOINTS.CREATE_QUESTION, data),

  /**
   * 更新问题
   */
  updateQuestion: (id, data) =>
    httpClient.put(API_ENDPOINTS.UPDATE_QUESTION.replace(':id', id), data),

  /**
   * 删除问题
   */
  deleteQuestion: (id) =>
    httpClient.delete(API_ENDPOINTS.DELETE_QUESTION.replace(':id', id)),

  /**
   * 获取答案列表
   */
  getAnswers: (questionId, params) =>
    httpClient.get(API_ENDPOINTS.GET_ANSWERS.replace(':questionId', questionId), {
      ...params,
    }),

  /**
   * 创建答案
   */
  createAnswer: (questionId, data) =>
    httpClient.post(API_ENDPOINTS.CREATE_ANSWER.replace(':questionId', questionId), data),

  /**
   * 更新答案
   */
  updateAnswer: (id, data) =>
    httpClient.put(API_ENDPOINTS.UPDATE_ANSWER.replace(':id', id), data),

  /**
   * 删除答案
   */
  deleteAnswer: (id) =>
    httpClient.delete(API_ENDPOINTS.DELETE_ANSWER.replace(':id', id)),
};

/**
 * 管理相关 API
 */
export const adminAPI = {
  /**
   * 获取统计信息
   */
  getAnalytics: () =>
    httpClient.get(API_ENDPOINTS.GET_ANALYTICS),

  /**
   * 获取系统设置
   */
  getSystemSettings: () =>
    httpClient.get(API_ENDPOINTS.GET_SYSTEM_SETTINGS),

  /**
   * 更新系统设置
   */
  updateSystemSettings: (data) =>
    httpClient.put(API_ENDPOINTS.UPDATE_SYSTEM_SETTINGS, data),
};