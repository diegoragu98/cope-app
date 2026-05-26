import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  description,
  icon,
}: PageHeaderProps) {
  return (
    <div className="text-center mb-12">
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
        {title}
      </h1>
      {subtitle && (
        <h2 className="text-xl text-teal-600 font-semibold mb-4">{subtitle}</h2>
      )}
      {description && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
