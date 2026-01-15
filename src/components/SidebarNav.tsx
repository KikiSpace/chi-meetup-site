'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'about', label: 'What This Is About' },
  { id: 'participate', label: 'Participate' },
  { id: 'organizers', label: 'Organizers' },
];

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:block fixed left-0 top-0 h-screen w-64 border-r border-border bg-background/80 backdrop-blur-sm z-40">
        <div className="flex flex-col h-full py-24 px-8">
          <div className="mb-12">
            <Link href="/home" className="font-serif text-2xl font-bold text-foreground hover:text-accent transition-colors">
              CHI 2026
            </Link>
            <p className="text-sm text-secondary mt-2">Generative Design & Vibe Coding</p>
          </div>

          <div className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${activeSection === item.id
                    ? 'bg-surface text-foreground border-l-2 border-accent'
                    : 'text-secondary hover:text-foreground hover:bg-surface/50'
                  }
                `.trim()}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-border">
            <div className="space-y-2">
              <Link
                href="/updates"
                className="block px-4 py-2 text-sm text-secondary hover:text-foreground transition-colors"
              >
                Updates
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/home" className="font-serif text-xl font-bold text-foreground">
            CHI 2026
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-surface transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="border-t border-border bg-background">
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${activeSection === item.id
                      ? 'bg-surface text-foreground'
                      : 'text-secondary hover:text-foreground hover:bg-surface/50'
                    }
                  `.trim()}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-border space-y-2">
                <Link
                  href="/updates"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm text-secondary hover:text-foreground hover:bg-surface/50 rounded-lg transition-colors"
                >
                  Updates
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
