'use client';

import React, { useEffect, useRef } from 'react';
import { X, ExternalLink } from 'lucide-react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
}

export function PdfModal({ isOpen, onClose, pdfUrl, title = 'Document' }: PdfModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Store the previously focused element
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Focus trap and return focus on close
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button when modal opens
    closeButtonRef.current?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], iframe, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        previousActiveElement.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Close on click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      previousActiveElement.current?.focus();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl h-[90vh] mx-4 bg-surface-elevated border border-border rounded-xl shadow-lg overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface/50">
          <h2 id="modal-title" className="text-lg font-semibold text-foreground">
            {title}
          </h2>
          <div className="flex items-center gap-3">
            {/* Open in new tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-accent transition-colors"
            >
              <ExternalLink size={14} />
              <span>Open in new tab</span>
            </a>

            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={() => {
                onClose();
                previousActiveElement.current?.focus();
              }}
              className="p-2 rounded-lg text-secondary hover:text-foreground hover:bg-surface transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-surface/30">
          <iframe
            src={pdfUrl}
            className="w-full h-full"
            title={title}
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
