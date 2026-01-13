import React from 'react';
import { Mail } from 'lucide-react';

interface OrganizerCardProps {
  name: string;
  role: string;
  affiliation: string;
  email: string;
}

export function OrganizerCard({ name, role, affiliation, email }: OrganizerCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="group relative">
      <div className="h-full bg-surface-elevated border border-border rounded-xl p-6 hover:border-accent/30 transition-all duration-300 hover:shadow-sm">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-surface border-2 border-border flex items-center justify-center mb-4 group-hover:border-accent/30 transition-all">
          <span className="text-xl font-serif text-accent">{initials}</span>
        </div>

        {/* Info */}
        <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
          {name}
        </h3>
        <p className="text-sm text-secondary mb-1">{role}</p>
        <p className="text-xs text-secondary mb-4">{affiliation}</p>

        {/* Email */}
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2 text-xs text-secondary hover:text-accent transition-colors"
        >
          <Mail size={14} />
          <span className="truncate">{email}</span>
        </a>
      </div>
    </div>
  );
}
