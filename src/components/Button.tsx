import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg
    font-medium text-sm transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-foreground text-background hover:bg-secondary
      disabled:hover:bg-foreground
    `,
    secondary: `
      bg-surface border border-border text-foreground
      hover:bg-surface-elevated hover:border-secondary
      disabled:hover:bg-surface disabled:hover:border-border
    `,
    ghost: `
      text-foreground hover:bg-surface
      disabled:hover:bg-transparent
    `,
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`.trim();

  if (href && !disabled) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={styles}>
      {children}
    </button>
  );
}
