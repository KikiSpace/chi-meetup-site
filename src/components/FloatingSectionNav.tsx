'use client';

import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

interface SectionItem {
  id: string;
  label: string;
}

const sections: SectionItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'about', label: 'About' },
  { id: 'participate', label: 'Participate' },
  { id: 'organizers', label: 'Organizers' },
];

export function FloatingSectionNav() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsExpanded(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Floating Bubble Navigator */}
      <div className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
        <div
          className="flex flex-col gap-3"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                aria-label={`Navigate to ${section.label}`}
                className={`
                  group relative flex items-center justify-end
                  transition-all duration-300 ease-out
                  ${isActive ? 'scale-110' : 'hover:scale-105'}
                `.trim()}
              >
                {/* Label (expands on hover) */}
                <div
                  className={`
                    absolute right-full mr-3 px-3 py-1.5 rounded-lg
                    bg-surface-elevated border border-border
                    text-xs font-medium whitespace-nowrap
                    transition-all duration-300
                    ${isExpanded || isActive
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-2 pointer-events-none'
                    }
                    ${isActive ? 'text-accent' : 'text-secondary'}
                  `.trim()}
                >
                  {section.label}
                </div>

                {/* Bubble */}
                <div
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${isActive
                      ? 'bg-accent ring-4 ring-accent/20'
                      : 'bg-border hover:bg-accent/50 hover:ring-2 hover:ring-accent/10'
                    }
                  `.trim()}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Floating Button + Menu */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        {isMobileMenuOpen && (
          <div className="absolute bottom-full right-0 mb-4 w-48">
            <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-lg overflow-hidden">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      w-full px-4 py-3 text-left text-sm font-medium
                      transition-colors border-b border-border last:border-b-0
                      ${isActive
                        ? 'bg-surface text-accent'
                        : 'text-foreground hover:bg-surface/50'
                      }
                    `.trim()}
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle section menu"
          className={`
            w-14 h-14 rounded-full
            bg-foreground text-background
            shadow-lg hover:shadow-xl
            flex items-center justify-center
            transition-all duration-300
            ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}
          `.trim()}
        >
          <Menu size={24} />
        </button>
      </div>
    </>
  );
}
