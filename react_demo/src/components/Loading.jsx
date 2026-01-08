/**
 * Loading 组件
 * 加载动画
 */

export function Loading({ text = '加载中...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  );
}

export function Spinner({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`inline-block animate-spin rounded-full border-b-2 border-blue-500 ${sizeMap[size]} ${className}`}></div>
  );
}