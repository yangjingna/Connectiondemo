/**
 * HTTP 请求客户端
 * 包含请求拦截器、响应拦截器、错误处理等
 */

import { API_BASE_URL, HTTP_TIMEOUT, STORAGE_KEYS } from '../constants/config';
import { storage } from '../utils/storage';

class HttpClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.timeout = HTTP_TIMEOUT;
    this.interceptors = {
      request: [],
      response: [],
    };
  }

  /**
   * 添加请求拦截器
   */
  addRequestInterceptor(handler) {
    this.interceptors.request.push(handler);
  }

  /**
   * 添加响应拦截器
   */
  addResponseInterceptor(handler) {
    this.interceptors.response.push(handler);
  }

  /**
   * 执行请求拦截器
   */
  async executeRequestInterceptors(config) {
    let finalConfig = { ...config };
    for (const interceptor of this.interceptors.request) {
      finalConfig = await interceptor(finalConfig);
    }
    return finalConfig;
  }

  /**
   * 执行响应拦截器
   */
  async executeResponseInterceptors(response) {
    let finalResponse = { ...response };
    for (const interceptor of this.interceptors.response) {
      finalResponse = await interceptor(finalResponse);
    }
    return finalResponse;
  }

  /**
   * 发送请求
   */
  async request(method, url, data = null, options = {}) {
    const config = {
      method: method.toUpperCase(),
      url: this.baseURL + url,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      timeout: options.timeout || this.timeout,
    };

    // 添加请求体
    if (data) {
      if (method.toUpperCase() === 'GET') {
        config.url += '?' + new URLSearchParams(data).toString();
      } else {
        config.body = JSON.stringify(data);
      }
    }

    try {
      // 执行请求拦截器
      const finalConfig = await this.executeRequestInterceptors(config);

      // 发送请求
      const response = await fetch(finalConfig.url, {
        method: finalConfig.method,
        headers: finalConfig.headers,
        body: finalConfig.body,
        timeout: finalConfig.timeout,
      });

      // 解析响应
      let responseData;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      const responseObj = {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
        headers: response.headers,
      };

      // 检查响应状态
      if (!response.ok) {
        const error = new Error(responseData?.message || response.statusText);
        error.response = responseObj;
        throw error;
      }

      // 执行响应拦截器
      const finalResponse = await this.executeResponseInterceptors(responseObj);

      return finalResponse.data;
    } catch (error) {
      console.error(`[HTTP ${method.toUpperCase()}] ${url}`, error);
      throw error;
    }
  }

  // 便利方法
  get(url, options) {
    return this.request('GET', url, null, options);
  }

  post(url, data, options) {
    return this.request('POST', url, data, options);
  }

  put(url, data, options) {
    return this.request('PUT', url, data, options);
  }

  patch(url, data, options) {
    return this.request('PATCH', url, data, options);
  }

  delete(url, options) {
    return this.request('DELETE', url, null, options);
  }
}

// 创建全局 HTTP 客户端实例
export const httpClient = new HttpClient();

/**
 * 设置授权 token
 */
export function setAuthToken(token) {
  if (token) {
    httpClient.addRequestInterceptor((config) => {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
      return config;
    });
  }
}

/**
 * 初始化 HTTP 客户端
 * 包含默认的请求和响应拦截器
 */
export function initHttpClient() {
  // 请求拦截器：添加 token
  httpClient.addRequestInterceptor((config) => {
    const token = storage.get(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  });

  // 响应拦截器：处理错误和 token 过期
  httpClient.addResponseInterceptor((response) => {
    // 这里可以处理 token 过期的情况
    // 如果后端返回 401，可以尝试刷新 token 或重定向到登录页
    if (response.status === 401) {
      // 清除 token 和用户信息
      storage.remove(STORAGE_KEYS.TOKEN);
      storage.remove(STORAGE_KEYS.USER);
      // 重定向到登录页（在具体应用中通过事件或回调处理）
      window.dispatchEvent(new Event('auth:logout'));
    }
    return response;
  });
}

export default httpClient;