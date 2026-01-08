/**
 * useFetch Hook
 * 用于获取数据的通用 hook，自动处理 loading、error 状态
 */

import { useState, useEffect, useCallback } from 'react';
import httpClient from '../services/request';

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 提取依赖项，避免无限循环
  const dependencies = options.dependencies || [];
  const method = options.method || 'GET';
  const params = options.params || null;

  /**
   * 执行请求
   */
  const fetchData = useCallback(async () => {
    if (!url) return;

    try {
      setLoading(true);
      setError(null);

      let result;

      if (method.toUpperCase() === 'GET') {
        result = await httpClient.get(url, params);
      } else if (method.toUpperCase() === 'POST') {
        result = await httpClient.post(url, params);
      } else if (method.toUpperCase() === 'PUT') {
        result = await httpClient.put(url, params);
      } else if (method.toUpperCase() === 'DELETE') {
        result = await httpClient.delete(url);
      }

      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
      setData(null);
      console.error(`[useFetch] ${method} ${url}`, err);
    } finally {
      setLoading(false);
    }
  }, [url, method, params]);

  /**
   * 当 URL 或依赖项改变时，重新获取数据
   */
  useEffect(() => {
    if (options.immediate !== false) {
      fetchData();
    }
  }, [url, ...dependencies, fetchData]);

  /**
   * 手动刷新数据
   */
  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}