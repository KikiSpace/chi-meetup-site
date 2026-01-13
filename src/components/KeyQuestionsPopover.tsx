'use client';

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { HelpCircle } from 'lucide-react';

const questions = [
  'How do we maintain creative agency while leveraging AI tools?',
  'What breakdowns occur in trust, focus, and understanding?',
  "How does AI reshape Houde & Hill's prototyping dimensions?",
  'What are emerging best practices for human–AI collaboration?',
];

interface PopoverPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export function KeyQuestionsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PopoverPosition>({});
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Calculate optimal popover position
  useLayoutEffect(() => {
    if (!isOpen || !popoverRef.current || !buttonRef.current) return;

    const VIEWPORT_MARGIN = 12;
    const GAP = 8;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate available space in each direction
    const spaceAbove = buttonRect.top;
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceLeft = buttonRect.left;
    const spaceRight = viewportWidth - buttonRect.right;

    const newPosition: PopoverPosition = {};

    // Vertical positioning: prefer below, flip to above if not enough space
    if (spaceBelow >= popoverRect.height + GAP + VIEWPORT_MARGIN) {
      // Enough space below
      newPosition.top = buttonRect.bottom + GAP;
    } else if (spaceAbove >= popoverRect.height + GAP + VIEWPORT_MARGIN) {
      // Not enough space below, flip to above
      newPosition.bottom = viewportHeight - buttonRect.top + GAP;
    } else {
      // Not enough space above or below, position where there's more space
      if (spaceBelow > spaceAbove) {
        newPosition.top = buttonRect.bottom + GAP;
      } else {
        newPosition.bottom = viewportHeight - buttonRect.top + GAP;
      }
    }

    // Horizontal positioning: prefer left-aligned, adjust if clipping
    const popoverWidth = popoverRect.width || 320; // fallback to 320px (80 * 4)

    // Try left-aligned first
    if (buttonRect.left + popoverWidth + VIEWPORT_MARGIN <= viewportWidth) {
      newPosition.left = buttonRect.left;
    } else if (buttonRect.right - popoverWidth >= VIEWPORT_MARGIN) {
      // Right-aligned if left-aligned would clip
      newPosition.right = viewportWidth - buttonRect.right;
    } else {
      // Center in viewport with margin if neither works
      const centeredLeft = Math.max(
        VIEWPORT_MARGIN,
        Math.min(
          viewportWidth - popoverWidth - VIEWPORT_MARGIN,
          buttonRect.left + (buttonRect.width - popoverWidth) / 2
        )
      );
      newPosition.left = centeredLeft;
    }

    setPosition(newPosition);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        popoverRef.current &&
        buttonRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Recalculate position on window resize
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      if (popoverRef.current && buttonRef.current) {
        // Trigger recalculation by toggling a layout effect dependency
        setIsOpen(false);
        setTimeout(() => setIsOpen(true), 0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-accent transition-colors group"
      >
        <HelpCircle size={14} className="group-hover:text-accent transition-colors" />
        <span className="underline decoration-dotted underline-offset-2">Key questions</span>
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label="Key questions we'll explore"
          className="fixed w-80 max-w-[calc(100vw-1.5rem)] bg-surface-elevated border border-border rounded-lg shadow-sm p-4 z-50"
          style={{
            top: position.top !== undefined ? `${position.top}px` : undefined,
            bottom: position.bottom !== undefined ? `${position.bottom}px` : undefined,
            left: position.left !== undefined ? `${position.left}px` : undefined,
            right: position.right !== undefined ? `${position.right}px` : undefined,
          }}
        >
          <h4 className="text-sm font-semibold text-foreground mb-3">
            Key Questions We'll Explore
          </h4>
          <ol className="space-y-2 text-xs text-foreground leading-relaxed">
            {questions.map((question, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-surface border border-border flex items-center justify-center text-xs font-medium text-secondary mt-0.5">
                  {index + 1}
                </span>
                <span>{question}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
