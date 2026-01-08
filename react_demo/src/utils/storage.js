/**
 * 本地存储工具函数
 */

export const storage = {
  /**
   * 获取存储的值
   * @param {string} key
   * @param {any} defaultValue
   * @returns {any}
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Failed to get item from storage: ${key}`, error);
      return defaultValue;
    }
  },

  /**
   * 设置存储的值
   * @param {string} key
   * @param {any} value
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to set item in storage: ${key}`, error);
    }
  },

  /**
   * 删除存储的值
   * @param {string} key
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove item from storage: ${key}`, error);
    }
  },

  /**
   * 清空所有存储
   */
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage', error);
    }
  },

  /**
   * 检查 key 是否存在
   * @param {string} key
   * @returns {boolean}
   */
  hasKey(key) {
    return localStorage.getItem(key) !== null;
  },
};