import React from 'react';
import { Callout } from '@/components/Callout';
import { Section } from '@/components/Section';
import { Calendar } from 'lucide-react';

const updates = [
  {
    date: '2026-01-12',
    title: 'Website Launched & Registration Details',
    content: `We're excited to announce the launch of our meetup website! `,
    type: 'announcement' as const,
  },
  {
    date: '2026-01-08',
    title: 'Call for Tool Demonstrations',
    content: `Are you building generative design or vibe-coding tools? We're seeking short (5-min) tool demonstrations for our 15-minute demo session. We're interested in browser-based tools like V0.app, Bolt.new, Lovable, or novel approaches to AI-assisted prototyping. Share your workflows, prompting strategies, or experimental platforms. Contact us via the Participate page to propose your demo.`,
    type: 'call' as const,
  },
  {
    date: '2025-11-30',
    title: 'Meetup Accepted at CHI 2026 Barcelona!',
    content: `Our meetup proposal "Generative Design and Vibe Coding: Rethinking The Design-Development Divide for UI Prototyping" has been accepted for CHI 2026 in Barcelona, Spain (April 13-17)! This 90-minute session will bring together researchers, practitioners, and tool builders to explore how AI is transforming prototyping. Expect tool demos, a 40-minute designathon, and reflective discussion using the Houde & Hill framework.`,
    type: 'announcement' as const,
  }
];

export default function UpdatesPage() {
  return (
    <>
      {/* Header */}
      <Section className="bg-gradient-to-b from-surface/50 to-background !py-12 md:!py-20">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Updates
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Latest announcements, calls for participation, and meetup news.
          </p>
        </div>
      </Section>

      {/* Updates Timeline */}
      <Section>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
          Recent Updates
        </h2>

        <div className="space-y-6">
          {updates.map((update, index) => (
            <Callout key={index}>
              {/* Date & Type Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <div className="flex items-center gap-2 text-secondary text-sm">
                  <Calendar size={16} />
                  <time dateTime={update.date}>
                    {new Date(update.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${update.type === 'announcement'
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'bg-surface-elevated text-secondary border border-border'
                    }
                  `.trim()}
                >
                  {update.type === 'announcement' ? 'Announcement' : 'Call for Participation'}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-3">
                {update.title}
              </h3>

              {/* Content */}
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {update.content}
              </p>
            </Callout>
          ))}
        </div>
      </Section>

      {/* Archive Note */}
      <Section className="bg-surface/30">
        <div className="text-center">
          <p className="text-secondary text-sm">
            Showing {updates.length} most recent update{updates.length !== 1 ? 's' : ''}.
            <br />
            More updates will appear here as the event approaches.
          </p>
        </div>
      </Section>
    </>
  );
}
