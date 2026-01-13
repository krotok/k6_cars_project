/**
 * Converts a time string (e.g., '20s', '1m', '100ms') to milliseconds.
 * @param {string} timeString The string to convert.
 * @returns {number|null} The time in milliseconds, or null if the format is invalid.
 */

import { STEADY_START, STEADY_END } from '../k6/conf/config.js';

export function convertToMs(timeString) {
    // A regular expression to capture the number and the unit (s, m, ms)
    const match = timeString.match(/^(\d+)(ms|s|m)$/);

    if (!match) {
        console.error("Invalid time format. Use '20ms', '20s', or '20m'.");
        return null;
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case 'ms':
            return value;
        case 's':
            return value * 1000;
        case 'm':
            return value * 1000 * 60;
        default:
            // Should be caught by the regex check, but good practice
            return null;
    }
}

export function toSec(d) {
    if (d.endsWith('s')) return Number(d.slice(0, -1));
    if (d.endsWith('m')) return Number(d.slice(0, -1)) * 60;
    throw new Error(`Unknown duration format: ${d}`);
}