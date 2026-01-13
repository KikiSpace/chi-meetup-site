# CHI Meetup: Generative Design & Vibe Coding

A responsive event website for the CHI 2026 meetup exploring Gen-AI assisted prototyping in HCI, with an Anthropic-inspired aesthetic.

## Overview

This website features:
- **3 streamlined routes**: Home, Community, Updates
- **Full-screen sectioned landing page** with left sidebar navigation
- **4 comprehensive sections**: Overview, About, Participate, Organizers
- Time-gated participation content (locked until Feb 5, 2026)
- Premium-minimal Anthropic-inspired design with warm neutral palette
- Fully responsive with mobile-optimized navigation drawer
- Smooth scroll anchor navigation with active section highlighting
- Keyboard accessible with proper focus states

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 20+ installed
- pnpm installed (or use npm/yarn)

### Installation

1. Install dependencies:
```bash
pnpm install
```

### Development

Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The site will auto-reload as you edit files.

### Build

Create an optimized production build:
```bash
pnpm build
```

### Production

Run the production server:
```bash
pnpm start
```

## Deployment to GitHub Pages

This site is configured for deployment to GitHub Pages using GitHub Actions.

### Prerequisites

1. A GitHub repository named `chi-meetup-site` (or update `REPO_NAME` in `next.config.ts`)
2. GitHub Pages enabled in repository settings

### Configuration

The repository name is configured in `next.config.ts`:

```typescript
const REPO_NAME = "chi-meetup-site";
```

**To deploy to a different repository name:**
1. Update the `REPO_NAME` constant in `next.config.ts`
2. Commit and push the changes

### GitHub Repository Settings

After pushing your code to GitHub, enable GitHub Pages:

1. Go to your repository on GitHub
2. Click **Settings** > **Pages** (in the left sidebar)
3. Under **Source**, select:
   - **Source**: GitHub Actions
4. Save the settings

### Deployment Process

The site automatically deploys when you push to the `main` branch:

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Your commit message"
   ```

2. **Push to main:**
   ```bash
   git push origin main
   ```

3. **Monitor deployment:**
   - Go to the **Actions** tab in your GitHub repository
   - Watch the "Deploy to GitHub Pages" workflow
   - Once complete, your site will be live at:
     ```
     https://<your-username>.github.io/chi-meetup-site/
     ```

### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" > "Run workflow"

### Local Testing of Production Build

To test the production build locally before deploying:

```bash
# Build the static export
pnpm build

# The output will be in the 'out' directory
# You can serve it locally with any static server, e.g.:
npx serve out
```

### Troubleshooting

**404 errors on page refresh:**
- Next.js static export with custom routing is handled by the `not-found.tsx` page
- Links should work correctly with the basePath configuration

**Images not loading:**
- Verify images are in the `public` directory
- Check that image paths don't include the basePath manually (Next.js handles this automatically)

**Base path issues:**
- The `basePath` is automatically applied in production
- In development (`pnpm dev`), the site runs at the root path without basePath
- Update `REPO_NAME` in `next.config.ts` if your repository name differs

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Root redirect to /home
│   ├── home/              # Landing page with 4 full-screen sections
│   ├── community/         # Community resources
│   └── updates/           # Announcements
├── components/            # React components
│   ├── FloatingSectionNav.tsx # Floating bubble navigator with IntersectionObserver
│   ├── FullScreenSection.tsx # Full-height section wrapper
│   ├── OrganizerCard.tsx  # Organizer card component
│   ├── Button.tsx         # Button component with variants
│   ├── Callout.tsx        # Callout/card component
│   ├── Section.tsx        # Section wrapper (for non-home pages)
│   ├── Nav.tsx            # Top navigation bar (Community/Updates)
│   ├── Footer.tsx         # Footer
│   └── Layout.tsx         # Main layout wrapper
└── lib/                   # Utilities
    ├── constants.ts       # Configuration constants
    └── time-gate.ts       # Time-gating logic
```

## Key Features

### Full-Screen Landing Page

The home page (`/home`) features 4 full-screen sections with smooth scroll navigation:

1. **Overview Section** - Hero with event title, subtitle, date/location info
2. **About Section** - Key themes, two paradigms (Generative Design & Vibe Coding), 90-minute format
3. **Participate Section** - Time-gated registration with locked/open states
4. **Organizers Section** - Gallery of 9 organizers in responsive grid + contact info

**Navigation Features:**
- **Floating Bubble Navigator**: Unobtrusive right-side navigation with polished bubble UI
  - **Desktop**: Mid-right floating bubbles that expand on hover to show section labels
  - **Mobile**: Compact floating button (bottom-right) that opens a section menu
  - **Active Indicator**: Current section highlighted with accent color and ring
  - **Back to Top**: Dedicated bubble to scroll to top
- **IntersectionObserver**: Automatic active section detection while scrolling
- **Smooth Scroll**: Click any bubble to smoothly scroll to the section
- **Keyboard Accessible**: Full tab navigation and screen reader support
- **Top Nav Bar**: Consistent Home/Community/Updates navigation across all pages

### Time-Gated Content

The Participate section (Section 3) shows different content based on the current date:

- **Before Feb 5, 2026**: Shows locked state with "Notify me" form and disabled buttons
- **After Feb 5, 2026**: Shows active buttons for survey and RSVP, plus who should attend info

To modify the survey open date, edit `src/lib/constants.ts`:

```typescript
export const SURVEY_OPEN_DATE = new Date('2026-02-05T00:00:00+08:00');
```

### Design System

The site uses an Anthropic-inspired design with:
- Warm neutral palette (beige/gray tones)
- Generous whitespace and breathing room
- Subtle gradients and soft borders
- Editorial typography hierarchy
- Calm, premium-minimal aesthetic

Colors are defined in `src/app/globals.css` and can be customized.

### Component Library

- **Button**: Primary, secondary, and ghost variants with disabled states
- **Callout**: Default, accent, and locked variants for highlighted content
- **Section**: Container with optional padding and contained width
- **Nav**: Responsive navigation with mobile menu
- **Footer**: Multi-column footer with links

## Customization

### Content

Update placeholder content in:
- `src/app/organizers/page.tsx` - Replace organizer bios
- `src/app/updates/page.tsx` - Add real announcements
- `src/lib/constants.ts` - Update survey/signup URLs

### Styling

Modify the color palette in `src/app/globals.css`:

```css
:root {
  --background: #fafaf8;     /* Main background */
  --foreground: #2a2a2a;     /* Main text */
  --secondary: #6b6b6b;      /* Secondary text */
  --surface: #f5f3f0;        /* Surface backgrounds */
  --accent: #d4a574;         /* Accent color */
  /* ... */
}
```

### Time-Gating

Test the time-gating behavior by temporarily changing the date in `src/lib/constants.ts` to a past date to see the "open" state.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy (zero configuration needed)

### Other Platforms

Build the static export:
```bash
pnpm build
```

The output will be in `.next/` and can be deployed to any static hosting provider.

## License

All rights reserved.
