import { SURVEY_OPEN_DATE } from './constants';

/**
 * Checks if the current time is past the survey open date
 * @returns true if survey is open, false if locked
 */
export function isSurveyOpen(): boolean {
  return new Date() >= SURVEY_OPEN_DATE;
}

/**
 * Formats the survey open date for display
 * @returns formatted date string
 */
export function formatSurveyOpenDate(): string {
  return SURVEY_OPEN_DATE.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
