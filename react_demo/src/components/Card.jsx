/**
 * Card 组件
 * 通用卡片组件
 */

export function Card({ children, className = '', ...props }) {
  const cardStyles = `
    bg-white rounded-lg shadow-md p-6
    transition-shadow duration-200 hover:shadow-lg
    ${className}
  `.replace(/\s+/g, ' ');

  return (
    <div className={cardStyles} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-sm text-gray-600 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`mt-6 flex gap-4 ${className}`}>
      {children}
    </div>
  );
}