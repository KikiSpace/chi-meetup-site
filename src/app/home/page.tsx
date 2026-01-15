'use client';

import React, { useState, useEffect } from 'react';
import { FloatingSectionNav } from '@/components/FloatingSectionNav';
import { FullScreenSection } from '@/components/FullScreenSection';
import { OrganizerCard } from '@/components/OrganizerCard';
import { Callout } from '@/components/Callout';
import { KeyQuestionsPopover } from '@/components/KeyQuestionsPopover';
import { PdfModal } from '@/components/PdfModal';
import { getAssetUrl } from '@/lib/constants';
import { ExternalLink, Sparkles } from 'lucide-react';

const organizers = [
  {
    name: 'Xinqi Zhang',
    role: 'PhD Student',
    affiliation: 'Santa Clara University, USA',
    email: 'xzhang22@scu.edu',
    photo: 'https://media.licdn.com/dms/image/v2/D5603AQE8gGI0S1lGGQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1678269512299?e=1770249600&v=beta&t=6IpWAN3itYfZjTU8QaH95UwSwFKAsJxF_EMecNSNHeE',
    bio: 'PhD student in the Human-Computer Interaction Lab at Santa Clara University. Research on how AI agents can support digital wellbeing and bridge technical gaps for novices; involved in the Bay Area hackathon community and hosting this meetup.',
  },
  {
    name: 'Hari Subramonyam',
    role: 'Assistant Professor',
    affiliation: 'Stanford University, USA',
    email: 'hari@stanford.edu',
    photo: 'https://ed.stanford.edu/sites/default/files/styles/square_crop/public/faculty/cap/harihars.jpg?itok=3CxtHa1X',
    bio: 'Assistant Professor (Research) at Stanford University. Works on cognitively informed design, co-design with learners/educators, and transformative AI-enabled learning experiences; advances responsible design tools and methods centered on ethics and human values.',
  },
  {
    name: 'Advait Sarkar',
    role: 'Researcher',
    affiliation: 'Microsoft Research, UK',
    email: 'advait@microsoft.com',
    photo: 'https://advait.org/img/advait.jpg',
    bio: 'Researcher at Microsoft and lecturer at University of Cambridge/UCL. Studies effects of Generative AI on knowledge work, productivity, and creativity; leads agenda on enhancing critical thinking with Generative AI; authored "AI Should Challenge, Not Obey."',
  },
  {
    name: 'Ian Drosos',
    role: 'Member of Technical Staff',
    affiliation: 'Trent AI, UK',
    email: 'ian@trent.ai',
    photo: 'https://media.licdn.com/dms/image/v2/C5603AQEoI6Be3SVduA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1657194676693?e=1770249600&v=beta&t=OhACm9XdfqmzJAO3Nna8uv9kkEehTLJnUNfdcFgT-rU',
    bio: 'Member of Technical Staff at Trent AI; designs and develops UX for creating/steering AI agents for secure code and processes; focuses on generative UX while addressing risks of vibe coding and modern dev workflows.',
  },
  {
    name: 'Jack Wang',
    role: 'Researcher',
    affiliation: 'Adobe Research, USA',
    email: 'jackwa@adobe.com',
    photo: 'https://zichaow.github.io/images/headshot-2.jpg',
    bio: 'Researcher at Adobe Research focusing on human-centered AI/ML technologies for human learning, creativity, and productivity.',
  },
  {
    name: 'Kyungho Lee',
    role: 'Associate Professor',
    affiliation: 'UNIST, South Korea',
    email: 'kyungho@unist.ac.kr',
    photo: 'https://scholar.googleusercontent.com/citations?view_op=view_photo&user=ln_in2cAAAAJ&citpid=2',
    bio: 'Associate Professor at UNIST; directs the Expressive Computing Lab; explores AI as tool/material/medium for design, guiding AI development via human-centered values toward computational expression and human–AI co-creation.',
  },
  {
    name: 'Veronica Pimenova',
    role: 'PhD Student',
    affiliation: 'University of Michigan, USA',
    email: 'pimenova@umich.edu',
    photo: 'https://lh3.googleusercontent.com/a-/ALV-UjUyipYh4-Ybrga-vTtWdoWxpdt2u-BMl5R7NKuk5h-ST6ggBoyr=s240-p-k-rw-no',
    bio: 'PhD student at the University of Michigan School of Information; research on human factors of software engineering, focusing on AI tools for accessibility and developer productivity in workplace environments.',
  },
  {
    name: 'Xiang "Anthony" Chen',
    role: 'Associate Professor',
    affiliation: 'UCLA, USA',
    email: 'xac@ucla.edu',
    photo: 'https://hci.prof/image/xac.jpg',
    bio: 'Associate Professor at UCLA (ECE/CS). Human-centered interactive AI systems aligning with human values; multiple awards; 60+ publications with best paper awards/honorable mentions.',
  },
  {
    name: 'Kai Lukoff',
    role: 'Assistant Professor',
    affiliation: 'Santa Clara University, USA',
    email: 'klukoff@scu.edu',
    photo: 'https://www.scu.edu/media/school-of-engineering/photos/faculty-staff/lukoff_headshot_looking_right---Kai-Lukoff.jpeg',
    bio: 'Assistant Professor at Santa Clara University; research on human-centered AI design and implications for prototyping and user agency; teaches software engineering focusing on critically and creatively integrating AI tools in development workflows.',
  },
];

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  return (
    <div className="relative">
      {/* Floating Section Navigator */}
      <FloatingSectionNav />

      {/* Main Content */}
      <div className="snap-y snap-mandatory scroll-smooth overflow-y-auto h-screen">
        {/* Section 1: Overview */}
        <FullScreenSection id="overview" variant="gradient">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border mb-6">
              <Sparkles size={16} className="text-accent" />
              <span className="text-sm text-secondary font-medium">
                CHI 2026 • April 13–17 • Barcelona, Spain
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl md:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Generative Design & Vibe Coding
            </h1>

            {/* Secondary Subtitle */}
            <p className="text-lg md:text-2xl text-secondary mb-6 leading-relaxed max-w-2xl mx-auto">
              Rethinking the{' '}
              <span className="inline-block px-2 py-0.5 rounded bg-accent/10 text-foreground font-medium">
                design–development
              </span>
              {' '}divide for UI prototyping
            </p>

            <p className="text-base md:text-lg text-secondary leading-relaxed max-w-2xl mx-auto mb-6">
              An interactive CHI 2026 meetup exploring how Gen-AI is reshaping prototyping across
              Houde & Hill's dimensions of <em>look and feel</em> and <em>implementation</em>.
              Through hands-on activities and reflection, we'll discuss opportunities, breakdowns,
              and best practices for human–AI collaboration.
            </p>

            {/* Workshop Proposal Link */}
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors group"
            >
              <span className="underline decoration-1 underline-offset-4 group-hover:decoration-accent">
                Read our Meetup Proposal
              </span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          </div>
        </FullScreenSection>

        {/* Section 2: About */}
        <FullScreenSection id="about" variant="default" align="start">
          <div className="max-w-4xl mx-auto">
            {/* Lead Paragraph */}
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-16 text-center max-w-3xl mx-auto">
              Prototyping has long been central to HCI as a way of knowing. Recent advances in
              Generative AI are reshaping who prototypes and how—blurring boundaries between
              designers and developers, enabling faster workflows while raising new challenges
              around trust, authorship, and control.
            </p>

            {/* Teaser Image + Caption */}
            <div className="mb-16">
              <div className="relative w-full max-w-2xl mx-auto mb-6" style={{ minHeight: '150px' }}>
                {/* Using GitHub URL with ?raw=true to ensure proper loading on GitHub Pages */}
                <img
                  src="https://github.com/KikiSpace/chi-meetup-site/blob/main/assets/4x4.png?raw=true"
                  alt="Teaser figure: Generative Design and Vibe Coding paradigms"
                  onError={(e) => {
                    // Fallback to raw.githubusercontent.com if GitHub blob URL fails
                    e.currentTarget.src = 'https://raw.githubusercontent.com/KikiSpace/chi-meetup-site/main/assets/4x4.png';
                    e.currentTarget.onerror = null; // Prevent infinite loop
                  }}
                  className="w-full h-auto rounded-lg block"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%',
                    background: 'transparent',
                    display: 'block',
                    visibility: 'visible',
                    opacity: 1
                  }}
                />
              </div>
              <p className="text-sm text-secondary text-center max-w-2xl mx-auto leading-relaxed">
                Generative AI blurs the traditional boundary between design and development. Two emerging
                paradigms—<strong className="text-foreground">Generative Design</strong> (Uizard, Adobe Firefly)
                and <strong className="text-foreground">Vibe Coding</strong> (V0.dev, Bolt.new, Lovable)—are
                transforming the one-directional handoff into a collaborative, AI-mediated co-creation loop.
              </p>
            </div>

            {/* 90-Minute Format */}
            <Callout variant="accent">
              <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
                <h3 className="font-semibold text-xl text-foreground">
                  90-Minute Designathon Format
                </h3>
                <KeyQuestionsPopover />
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-3">
                    <span className="font-semibold text-foreground">1</span>
                  </div>
                  <p className="font-medium text-foreground mb-1">Intro</p>
                  <p className="text-sm text-secondary">10 min</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-3">
                    <span className="font-semibold text-foreground">2</span>
                  </div>
                  <p className="font-medium text-foreground mb-1">Tool Demos</p>
                  <p className="text-sm text-secondary">15 min</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3">
                    <span className="font-semibold text-accent">3</span>
                  </div>
                  <p className="font-medium text-foreground mb-1">Designathon</p>
                  <p className="text-sm text-secondary">40 min</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-3">
                    <span className="font-semibold text-foreground">4</span>
                  </div>
                  <p className="font-medium text-foreground mb-1">Reflection</p>
                  <p className="text-sm text-secondary">20 min</p>
                </div>
              </div>
            </Callout>
          </div>
        </FullScreenSection>

        {/* Section 3: Participate */}
        <FullScreenSection id="participate" variant="surface">
          <div className="max-w-2xl mx-auto text-center">
            {/* Lead-in */}
            <div className="inline-block mb-8">
              <p className="text-xl md:text-2xl font-semibold text-foreground px-6 py-3 rounded-full bg-accent/10 border border-accent/20">
                Participate our Designathon
              </p>
            </div>

            {/* Meetup Plan Narrative */}
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
              This will be a very exciting Designathon Meetup for the CHI community.
              We're excited to host this event to connect researchers and casually build a research
              community around shared interests.
            </p>

            <p className="text-base md:text-lg text-secondary leading-relaxed mb-10">
              Pre-event surveys and RSVP will open in mid-February. If you're interested in
              participating, please leave your email—we'll keep you updated about the event
              and survey to support better planning.
            </p>

            {/* Email Interest Field */}
            <div className="max-w-md mx-auto">
              <label htmlFor="email-interest" className="block text-sm font-medium text-foreground mb-2">
                Get updates
              </label>
              <input
                id="email-interest"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              />
              <p className="text-xs text-secondary mt-2">
                We'll only email you about this meetup.
              </p>
            </div>
          </div>
        </FullScreenSection>

        {/* Section 4: Organizers */}
        <FullScreenSection id="organizers" variant="default" align="start">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
              Organizers
            </h2>
            <p className="text-lg text-secondary mb-12 text-center max-w-2xl mx-auto">
              An international team of researchers and practitioners from Santa Clara University,
              Stanford, Adobe, UCLA, Microsoft Research, and beyond.
            </p>

            <div className="space-y-8 mb-16 max-w-5xl mx-auto">
              {organizers.map((organizer, index) => (
                <OrganizerCard key={index} {...organizer} />
              ))}
            </div>

            <div className="border-t border-border pt-12">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-6 text-center">
                Get in Touch
              </h3>
              <p className="text-center text-secondary mb-8 max-w-2xl mx-auto">
                Have questions, ideas, or want to contribute a tool demo? We'd love to hear from you.
                Reach out to any of the organizers directly.
              </p>
            </div>
          </div>
        </FullScreenSection>
      </div>

      {/* PDF Modal */}
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl={getAssetUrl('papers/chi26h-sub1796-cam-i61.pdf')}
        title="Workshop Proposal"
      />
    </div>
  );
}
