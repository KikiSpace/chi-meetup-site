// Event configuration constants

// Survey open date: February 5, 2026 at midnight Singapore time (UTC+8)
export const SURVEY_OPEN_DATE = new Date('2026-02-05T00:00:00+08:00');

// Survey and RSVP links (update when available)
export const SURVEY_URL = 'https://example.com/survey';
export const SIGNUP_URL = 'https://example.com/signup';
export const CONTRIBUTE_URL = 'https://example.com/contribute';

// Deployment configuration
// Supports both custom domain and GitHub Pages subdirectory deployment
const REPO_NAME = 'chi-meetup-site';

// Check if deploying to custom domain
const isCustomDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN === 'true';
const isProduction = process.env.NODE_ENV === 'production';

// Base path for assets (empty for custom domain, /repo-name for GitHub Pages subdirectory)
export const BASE_PATH = isCustomDomain || !isProduction ? '' : `/${REPO_NAME}`;

// Helper function to get asset URLs with correct basePath
export function getAssetUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return BASE_PATH ? `${BASE_PATH}/${cleanPath}` : `/${cleanPath}`;
}
