/**
 * 表单验证工具函数
 */

/**
 * 验证邮箱
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证密码强度
 * @param {string} password
 * @returns {object} { isValid: boolean, strength: 'weak' | 'medium' | 'strong', message: string }
 */
export function validatePassword(password) {
  if (!password) {
    return { isValid: false, strength: 'weak', message: '密码不能为空' };
  }

  if (password.length < 6) {
    return { isValid: false, strength: 'weak', message: '密码至少需要 6 个字符' };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  const strength = hasUpperCase + hasLowerCase + hasNumber + hasSpecial;

  if (strength < 2) {
    return { isValid: true, strength: 'weak', message: '密码强度较弱' };
  }
  if (strength < 3) {
    return { isValid: true, strength: 'medium', message: '密码强度中等' };
  }
  return { isValid: true, strength: 'strong', message: '密码强度强' };
}

/**
 * 验证用户名
 * @param {string} username
 * @returns {boolean}
 */
export function validateUsername(username) {
  if (!username) return false;
  // 用户名：3-20位，字母、数字、下划线
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * 验证手机号
 * @param {string} phone
 * @returns {boolean}
 */
export function validatePhone(phone) {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * 验证URL
 * @param {string} url
 * @returns {boolean}
 */
export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证表单对象
 * @param {object} form
 * @param {object} rules
 * @returns {object}
 */
export function validateForm(form, rules) {
  const errors = {};

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = form[field];

    for (const rule of fieldRules) {
      if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
        errors[field] = rule.message || `${field} 是必填项`;
        break;
      }

      if (value && rule.validate && !rule.validate(value)) {
        errors[field] = rule.message || `${field} 验证失败`;
        break;
      }

      if (value && rule.minLength && value.length < rule.minLength) {
        errors[field] = rule.message || `${field} 最少需要 ${rule.minLength} 个字符`;
        break;
      }

      if (value && rule.maxLength && value.length > rule.maxLength) {
        errors[field] = rule.message || `${field} 最多不能超过 ${rule.maxLength} 个字符`;
        break;
      }
    }
  }

  return errors;
}