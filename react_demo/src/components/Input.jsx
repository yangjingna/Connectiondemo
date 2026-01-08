/**
 * Input 组件
 * 通用输入框组件
 */

import { forwardRef } from 'react';

export const Input = forwardRef(
  (
    {
      label,
      error,
      required = false,
      disabled = false,
      type = 'text',
      placeholder,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputStyles = `
      w-full px-4 py-2 border border-gray-300 rounded-lg
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      transition-colors duration-200
      ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-50' : 'bg-white'}
      ${error ? 'border-red-500 focus:ring-red-500' : ''}
      ${className}
    `.replace(/\s+/g, ' ');

    return (
      <div className="w-full">
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className={inputStyles}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';