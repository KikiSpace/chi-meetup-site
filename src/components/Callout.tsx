import React from 'react';

interface CalloutProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'locked';
  className?: string;
}

export function Callout({ children, variant = 'default', className = '' }: CalloutProps) {
  const variants = {
    default: 'bg-surface border-border',
    accent: 'bg-gradient-to-br from-surface to-surface-elevated border-accent/20',
    locked: 'bg-surface/50 border-border/50',
  };

  return (
    <div
      className={`
        border rounded-xl p-6 md:p-8 ${variants[variant]} ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}
