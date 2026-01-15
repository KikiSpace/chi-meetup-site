'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/home' },
  { label: 'Updates', href: '/updates' },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Subtitle */}
          <Link href="/home" className="flex items-center gap-3 group">
            <span className="font-serif text-xl font-semibold text-foreground group-hover:text-secondary transition-colors">
              CHI 2026
            </span>
            <span className="hidden sm:inline text-sm text-secondary font-normal">
              Generative Design & Vibe Coding
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive
                      ? 'text-foreground bg-surface'
                      : 'text-secondary hover:text-foreground hover:bg-surface/50'
                    }
                  `.trim()}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:bg-surface rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive
                      ? 'text-foreground bg-surface'
                      : 'text-secondary hover:text-foreground hover:bg-surface/50'
                    }
                  `.trim()}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
