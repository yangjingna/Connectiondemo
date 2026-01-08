/**
 * Alert 组件
 * 提示框
 */

export function Alert({ type = 'info', title, message, onClose, className = '' }) {
  const typeStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  const iconStyles = {
    info: '✓',
    success: '✓',
    warning: '!',
    error: '✕',
  };

  return (
    <div
      className={`
        border-l-4 p-4 rounded
        ${typeStyles[type]}
        ${className}
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 text-lg font-bold">{iconStyles[type]}</div>
        <div className="ml-3 flex-1">
          {title && <h3 className="font-medium">{title}</h3>}
          {message && <p className="text-sm mt-1">{message}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-lg leading-none hover:opacity-70"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}