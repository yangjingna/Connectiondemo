/**
 * useLocalStorage Hook
 * 用于读写本地存储，支持响应式更新
 */

import { useState, useCallback, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // 状态
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`useLocalStorage error reading key "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * 设置存储的值
   */
  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`useLocalStorage error setting key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  /**
   * 移除存储的值
   */
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`useLocalStorage error removing key "${key}":`, error);
    }
  }, [key, initialValue]);

  /**
   * 监听其他标签页的 storage 变化
   */
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`useLocalStorage error parsing storage change:`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
}