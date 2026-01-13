'use client';

import React, { useState } from 'react';
import { Section } from '@/components/Section';

export default function CommunityPage() {
  const [email, setEmail] = useState('');

  return (
    <Section className="!py-20 md:!py-32">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
          Community
        </h1>

        <p className="text-lg md:text-xl text-foreground leading-relaxed mb-10">
          Stay tuned—we plan to help connect researchers who are interested in similar topics.
          If you're interested, please leave your email to get notifications.
        </p>

        {/* Email Interest Field */}
        <div className="max-w-md mx-auto">
          <label htmlFor="community-email" className="block text-sm font-medium text-foreground mb-2">
            Get updates
          </label>
          <input
            id="community-email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
          />
          <p className="text-xs text-secondary mt-2">
            We'll only email you about this community.
          </p>
        </div>
      </div>
    </Section>
  );
}
