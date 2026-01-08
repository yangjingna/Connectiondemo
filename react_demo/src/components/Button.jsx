/**
 * Button 组件
 * 通用按钮组件，支持多种变体和大小
 */

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) {
  // 基础样式
  const baseStyles = 'font-medium transition-colors duration-200 rounded-lg';

  // 尺寸样式
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // 变体样式
  const variantStyles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
    success: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
    ghost: 'text-blue-500 hover:bg-blue-50',
  };

  // 禁用样式
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  const buttonStyles = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${disabledStyles}
    ${className}
  `.replace(/\s+/g, ' ');

  return (
    <button
      className={buttonStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center">
          <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></span>
          加载中...
        </span>
      ) : (
        children
      )}
    </button>
  );
}