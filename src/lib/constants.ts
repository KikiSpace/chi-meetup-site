// Event configuration constants

// Survey open date: February 5, 2026 at midnight Singapore time (UTC+8)
export const SURVEY_OPEN_DATE = new Date('2026-02-05T00:00:00+08:00');

// Survey and RSVP links (update when available)
export const SURVEY_URL = 'https://example.com/survey';
export const SIGNUP_URL = 'https://example.com/signup';
export const CONTRIBUTE_URL = 'https://example.com/contribute';

// GitHub Pages configuration
// Repository name for GitHub Pages deployment
const REPO_NAME = 'chi-meetup-site';

// Base path for GitHub Pages (only used in production)
// In development, this is empty string (runs at root)
// In production, this is /repo-name for GitHub Pages subdirectory
export const BASE_PATH = process.env.NODE_ENV === 'production' ? `/${REPO_NAME}` : '';

// Helper function to get asset URLs with correct basePath
export function getAssetUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return BASE_PATH ? `${BASE_PATH}/${cleanPath}` : `/${cleanPath}`;
}
