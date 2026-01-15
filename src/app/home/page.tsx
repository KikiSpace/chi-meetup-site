'use client';

import React, { useState, useEffect } from 'react';
import { FloatingSectionNav } from '@/components/FloatingSectionNav';
import { FullScreenSection } from '@/components/FullScreenSection';
import { OrganizerCard } from '@/components/OrganizerCard';
import { Callout } from '@/components/Callout';
import { KeyQuestionsPopover } from '@/components/KeyQuestionsPopover';
import { PdfModal } from '@/components/PdfModal';
import { getAssetUrl } from '@/lib/constants';
import { ExternalLink, Sparkles, ChevronDown } from 'lucide-react';

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

// Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby3cf2H8IRR_AuPfWT-oJW_zHszVbFGrna1V1J7vO0FT12R9Z_Ppss2ch1k-iovb2GS/exec';

export default function HomePage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; email?: string }>({});
  const [visibleActivities, setVisibleActivities] = useState<Set<number>>(new Set());

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: { firstName?: string; lastName?: string; email?: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prevent double submission
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send data to Google Sheets via Apps Script
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
        }),
      });

      // Note: With 'no-cors', we can't read the response, but the request will succeed
      // Show success message and clear form
      setIsSubmitted(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setErrors({});

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      // Show error in the form
      setErrors({
        email: 'Submission failed. Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Real-time validation hints
  const getEmailHint = () => {
    if (!email) return '';
    if (email.trim().length > 0 && !validateEmail(email)) {
      return 'Please enter a valid email address (e.g., name@example.com)';
    }
    return '';
  };

  const isFormValid = React.useMemo(() => {
    const hasFirstName = firstName.trim().length > 0;
    const hasLastName = lastName.trim().length > 0;
    const hasEmail = email.trim().length > 0;
    const emailIsValid = validateEmail(email.trim());

    return hasFirstName && hasLastName && hasEmail && emailIsValid;
  }, [firstName, lastName, email]);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Intersection Observer for mobile activity animations
  useEffect(() => {
    // Only apply on mobile screens
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (!isMobile) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const activityIndex = parseInt(entry.target.getAttribute('data-activity-index') || '0', 10);
        if (entry.isIntersecting) {
          setVisibleActivities((prev) => new Set(prev).add(activityIndex));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all activity elements
    const activityElements = document.querySelectorAll('[data-activity-index]');
    activityElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Floating Section Navigator */}
      <FloatingSectionNav />

      {/* Main Content */}
      <div className="snap-y snap-proximity scroll-smooth overflow-y-auto h-screen">
        {/* Section 1: Overview */}
        <FullScreenSection id="overview" variant="gradient">
          <div className="relative min-h-[calc(100vh-96px)] flex flex-col items-center justify-center">
            {/* Hero Content */}
            <div className="text-center max-w-3xl mx-auto pb-24">
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

            {/* Scroll Helper - Pinned at bottom */}
            <button
              onClick={scrollToAbout}
              className="absolute left-1/2 -translate-x-1/2 z-50 inline-flex flex-col items-center gap-2 text-sm text-secondary/60 hover:text-secondary transition-colors group"
              style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)' }}
              aria-label="Scroll to About section"
            >
              <span className="text-xs">Scroll to learn more</span>
              <ChevronDown
                size={20}
                className="animate-bounce-subtle motion-reduce:animate-none"
              />
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

            {/* 90-Minute Format - Vertical Timeline */}
            <div className="max-w-3xl mx-auto pb-24">
              <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
                <h3 className="font-semibold text-2xl text-foreground">
                  90-Minute Designathon Format
                </h3>
                <KeyQuestionsPopover />
              </div>

              {/* Vertical Timeline */}
              <div className="relative">
                {/* Timeline spine (vertical line) */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />

                {/* Timeline items */}
                <div className="space-y-10">
                  {/* Activity 1: Introduction */}
                  <div
                    className="relative pl-8 transition-all duration-500"
                    data-activity-index="0"
                    style={{
                      opacity: visibleActivities.has(0) ? 1 : 0.4,
                      transform: visibleActivities.has(0) ? 'translateY(0)' : 'translateY(8px)',
                    }}
                  >
                    {/* Dot marker */}
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-background border-2 border-border" aria-hidden="true" />

                    <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
                      <h4 className="font-semibold text-lg text-foreground">Introduction</h4>
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-surface border border-border text-secondary">
                        10 min
                      </span>
                    </div>
                    <p className="text-sm text-secondary leading-relaxed">
                      Set context on how generative AI is reshaping prototyping across design and development, and align everyone on the session purpose.
                    </p>
                  </div>

                  {/* Activity 2: Tool Demos */}
                  <div
                    className="relative pl-8 transition-all duration-500"
                    data-activity-index="1"
                    style={{
                      opacity: visibleActivities.has(1) ? 1 : 0.4,
                      transform: visibleActivities.has(1) ? 'translateY(0)' : 'translateY(8px)',
                    }}
                  >
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-background border-2 border-border" aria-hidden="true" />

                    <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
                      <h4 className="font-semibold text-lg text-foreground">Tool Demos</h4>
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-surface border border-border text-secondary">
                        15 min
                      </span>
                    </div>
                    <p className="text-sm text-secondary leading-relaxed">
                      Inspire participants with quick demos of browser-based generative design and vibe-coding tools to spark ideas for the hands-on activity.
                    </p>
                  </div>

                  {/* Activity 3: Designathon (highlighted) */}
                  <div
                    className="relative pl-8 transition-all duration-500"
                    data-activity-index="2"
                    style={{
                      opacity: visibleActivities.has(2) ? 1 : 0.4,
                      transform: visibleActivities.has(2) ? 'translateY(0)' : 'translateY(8px)',
                    }}
                  >
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-accent border-2 border-accent" aria-hidden="true" />

                    <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
                      <h4 className="font-semibold text-lg text-accent">Designathon</h4>
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-accent/10 border border-accent/20 text-accent">
                        40 min
                      </span>
                    </div>
                    <p className="text-sm text-secondary leading-relaxed">
                      Collaboratively prototype solutions to a shared design brief using Gen-AI tools, focusing on both "look & feel" and implementation.
                    </p>
                  </div>

                  {/* Activity 4: Group Reflection */}
                  <div
                    className="relative pl-8 transition-all duration-500"
                    data-activity-index="3"
                    style={{
                      opacity: visibleActivities.has(3) ? 1 : 0.4,
                      transform: visibleActivities.has(3) ? 'translateY(0)' : 'translateY(8px)',
                    }}
                  >
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-background border-2 border-border" aria-hidden="true" />

                    <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
                      <h4 className="font-semibold text-lg text-foreground">Group Reflection</h4>
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-surface border border-border text-secondary">
                        20 min
                      </span>
                    </div>
                    <p className="text-sm text-secondary leading-relaxed">
                      Reflect together on opportunities, breakdowns, and best practices using Houde & Hill's framework as a shared vocabulary.
                    </p>
                  </div>

                  {/* Activity 5: Closing */}
                  <div
                    className="relative pl-8 transition-all duration-500"
                    data-activity-index="4"
                    style={{
                      opacity: visibleActivities.has(4) ? 1 : 0.4,
                      transform: visibleActivities.has(4) ? 'translateY(0)' : 'translateY(8px)',
                    }}
                  >
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-background border-2 border-border" aria-hidden="true" />

                    <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
                      <h4 className="font-semibold text-lg text-foreground">Closing</h4>
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-surface border border-border text-secondary">
                        5 min
                      </span>
                    </div>
                    <p className="text-sm text-secondary leading-relaxed">
                      Wrap up key takeaways and highlight how insights can inform future research and practice in AI-assisted prototyping.
                    </p>
                  </div>
                </div>
              </div>

              {/* Editorial note */}
              <p className="text-sm text-secondary/70 text-center mt-16 leading-relaxed">
                More details for our event will post while approaching the event..
              </p>
            </div>
          </div>
        </FullScreenSection>

        {/* Section 3: Participate */}
        <FullScreenSection id="participate" variant="surface" align="start">
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
              participating, please share your details—we'll keep you updated about the event
              and survey to support better planning.
            </p>

            {/* Signup Form */}
            <div className="max-w-4xl mx-auto">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <p className="text-lg font-medium text-accent">
                    Thanks! We'll keep you updated.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: First Name + Last Name (side by side on desktop, stacked on mobile) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-foreground mb-2">
                        First Name
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? 'first-name-error' : undefined}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      />
                      {errors.firstName && (
                        <p id="first-name-error" className="text-xs text-red-600 mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        id="last-name"
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? 'last-name-error' : undefined}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      />
                      {errors.lastName && (
                        <p id="last-name-error" className="text-xs text-red-600 mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email + Submit Button */}
                  <div className="space-y-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={!!errors.email || !!getEmailHint()}
                        aria-describedby={errors.email ? 'email-error' : (getEmailHint() ? 'email-hint' : undefined)}
                        className={`w-full px-4 py-3 rounded-lg border bg-background text-foreground placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                          getEmailHint()
                            ? 'border-amber-500 focus:ring-amber-500/20'
                            : errors.email
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-border focus:ring-accent'
                        }`}
                      />
                      {/* Real-time validation hint */}
                      {getEmailHint() && !errors.email && (
                        <p id="email-hint" className="text-xs text-amber-600 mt-1">
                          {getEmailHint()}
                        </p>
                      )}
                      {/* Submission error */}
                      {errors.email && (
                        <p id="email-error" className="text-xs text-red-600 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className="w-full md:w-auto px-8 py-3 rounded-lg bg-foreground text-background font-medium hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-secondary text-center">
                    We'll only email you about this meetup.
                  </p>
                </form>
              )}
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
              An international team of researchers and practitioners from Santa Clara University, Stanford University, Adobe Research, UCLA, Microsoft Research, University of Cambridge, University College London, Trent AI, UNIST, and the University of Michigan.
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
              <div className="text-center max-w-2xl mx-auto">
                <p className="text-sm font-medium text-secondary mb-3">
                  Have questions or want to contribute?
                </p>
                <a
                  href="mailto:chi.genai.prototyping@gmail.com"
                  className="inline-block text-lg md:text-xl font-medium text-foreground hover:text-accent transition-colors underline decoration-1 underline-offset-4 hover:decoration-accent"
                >
                  chi.genai.prototyping@gmail.com
                </a>
              </div>
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
