/**
 * Convert a string to camelCase.
 *
 * Error handling:
 * - Throws TypeError('Input must be a string') when input is not a string (including null/undefined).
 * - Trims leading/trailing whitespace.
 * - Returns empty string for an empty input (after trim).
 *
 * This handles:
 * - spaces, underscores, hyphens and other non-alphanumeric separators
 * - ALL CAPS, mixed case, and existing camelCase boundaries
 *
 * Examples:
 * - toCamelCase('  Converts a string ') -> 'convertsAString'
 * - toCamelCase('handles_snake_case') -> 'handlesSnakeCase'
 * - toCamelCase('HANDLES-KEBAB-AND-UPPER-CASE') -> 'handlesKebabAndUpperCase'
 */
function toCamelCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }

    const trimmed = input.trim();
    if (trimmed === '') return '';

    // Separate camelCase boundaries like "helloWorld" -> "hello World"
    let normalized = trimmed.replace(/([a-z\d])([A-Z])/g, '$1 $2');

    // Replace any sequence of non-letter/digit characters with a single space.
    // Use Unicode property escapes to include letters from other languages.
    normalized = normalized.replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

    if (normalized === '') return '';

    const parts = normalized.split(/\s+/);
    const first = parts.shift().toLowerCase();
    const rest = parts.map(p => {
        const lower = p.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    });

    return [first, ...rest].join('');
}

module.exports = toCamelCase;