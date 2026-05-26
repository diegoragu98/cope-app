import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'highlight';
}

export function Card({
  children,
  className,
  variant = 'default',
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-white rounded-2xl shadow-lg',
    highlight: 'bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl shadow-md border border-teal-200',
  };

  return (
    <div
      className={cn(variants[variant], 'p-6 md:p-8', className)}
      {...props}
    >
      {children}
    </div>
  );
}
