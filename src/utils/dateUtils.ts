/**
 * Date utility functions for consistent date handling across the application
 */

/**
 * Converts a date to UTC midnight (00:00:00.000)
 * This ensures consistent date comparisons regardless of timezone
 * 
 * @param date - The date to convert (Date, string, or number)
 * @returns A new Date object set to UTC midnight
 * 
 * @example
 * const utcDate = toUTCMidnight(new Date('2024-03-15T14:30:00'));
 * // Returns: 2024-03-15T00:00:00.000Z
 */
export function toUTCMidnight(date: Date | string | number): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}
