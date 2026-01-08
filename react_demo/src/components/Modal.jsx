/**
 * Modal 组件
 * 模态框/对话框
 */

import { useEffect } from 'react';

export function Modal({ open, onClose, title, children, footer, size = 'md', className = '' }) {
  // 当 open 变化时，控制 body 滚动
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  if (!open) return null;

  const sizeMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      ></div>

      {/* 模态框 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={`
            bg-white rounded-lg shadow-xl
            w-full ${sizeMap[size]}
            max-h-screen overflow-y-auto
            ${className}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 头部 */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ✕
              </button>
            </div>
          )}

          {/* 内容 */}
          <div className="p-6">
            {children}
          </div>

          {/* 底部 */}
          {footer && (
            <div className="p-6 border-t border-gray-200 flex gap-4 justify-end">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}