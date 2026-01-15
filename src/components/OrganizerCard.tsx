import React from 'react';
import { Mail } from 'lucide-react';

interface OrganizerCardProps {
  name: string;
  role: string;
  affiliation: string;
  email: string;
  photo?: string;
  bio?: string;
}

export function OrganizerCard({ name, role, affiliation, email, photo, bio }: OrganizerCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="group relative">
      <div className="bg-surface-elevated border border-border rounded-xl p-6 hover:border-accent/30 transition-all duration-300 hover:shadow-sm">
        {/* Horizontal layout on desktop, vertical on mobile */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar - larger size */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 relative">
              {photo ? (
                <img
                  src={photo}
                  alt={`${name} profile photo`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget;
                    const fallback = img.nextElementSibling as HTMLElement;
                    if (fallback) {
                      img.style.display = 'none';
                      fallback.style.display = 'flex';
                    }
                  }}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover border-2 border-border group-hover:border-accent/30 transition-all"
                  style={{ aspectRatio: '1/1' }}
                />
              ) : null}
              <div
                className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-surface border-2 border-border flex items-center justify-center group-hover:border-accent/30 transition-all"
                style={{ display: photo ? 'none' : 'flex' }}
              >
                <span className="text-2xl md:text-3xl font-serif text-accent">{initials}</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-1">
              {name}
            </h3>
            <p className="text-sm md:text-base text-secondary mb-1">{role}</p>
            <p className="text-xs md:text-sm text-secondary mb-3">{affiliation}</p>

            {/* Bio */}
            {bio && (
              <p className="text-sm md:text-base text-foreground leading-relaxed mb-4">
                {bio}
              </p>
            )}

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-xs md:text-sm text-secondary hover:text-accent transition-colors"
            >
              <Mail size={14} />
              <span className="truncate">{email}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
