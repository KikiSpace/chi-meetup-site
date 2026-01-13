import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  contained?: boolean;
}

export function Section({ children, className = '', contained = true }: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`.trim()}>
      {contained ? (
        <div className="max-w-4xl mx-auto px-6 md:px-8">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
