import React from 'react';
import { TOTAL_SCROLL_OFFSET_PX, NAV_HEIGHT_PX } from '@/lib/nav-constants';

interface FullScreenSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'surface' | 'gradient';
  align?: 'start' | 'center';
}

export function FullScreenSection({
  id,
  children,
  className = '',
  variant = 'default',
  align = 'center',
}: FullScreenSectionProps) {
  const variants = {
    default: 'bg-background',
    surface: 'bg-surface/30',
    gradient: 'bg-gradient-to-b from-surface/50 to-background',
  };

  const alignments = {
    start: 'items-start',
    center: 'items-center',
  };

  return (
    <section
      id={id}
      className={`
        min-h-screen flex ${alignments[align]} justify-center
        snap-start snap-always
        overflow-y-auto
        ${variants[variant]}
        ${className}
      `.trim()}
      style={{
        scrollMarginTop: `${TOTAL_SCROLL_OFFSET_PX}px`,
      }}
    >
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 py-12">
        {children}
      </div>
    </section>
  );
}
