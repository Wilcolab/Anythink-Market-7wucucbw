/**
 * Convert a string to camelCase.
 *
 * Handles spaces, underscores, hyphens, dots and other non-alphanumeric separators,
 * as well as transitions from lower-case to upper-case (e.g. "userID" -> "userId").
 *
 * Examples:
 *   toCamelCase('first name')   // 'firstName'
 *   toCamelCase('user_id')      // 'userId'
 *   toCamelCase('SCREEN_NAME')  // 'screenName'
 *   toCamelCase('mobile-number')// 'mobileNumber'
 *
 * @param {string} input
 * @returns {string}
 */
function toCamelCase(input) {
    if (input == null) return '';
    const str = String(input).trim();
    if (str === '') return '';

    // If there are separators (non-alphanumeric), split on them.
    const hasSeparator = /[^A-Za-z0-9]+/.test(str);
    let parts;
    if (hasSeparator) {
        parts = str.split(/[^A-Za-z0-9]+/);
    } else if (/[a-z]/.test(str) && /[A-Z]/.test(str)) {
        // Split camelCase or PascalCase like "userID" -> ["user", "ID"]
        parts = str.split(/(?<=[a-z0-9])(?=[A-Z])/);
    } else {
        parts = [str];
    }

    parts = parts.filter(Boolean);

    if (parts.length === 0) return '';

    // Normalize: lowercase all parts, then capitalize subsequent parts.
    const normalized = parts.map(p => p.toLowerCase());
    const first = normalized[0];
    const rest = normalized.slice(1).map(p => (p.charAt(0).toUpperCase() + p.slice(1)));

    return [first, ...rest].join('');
}

module.exports = { toCamelCase };

/* Uncomment to quick-test
console.log(toCamelCase('first name'));    // firstName
console.log(toCamelCase('user_id'));       // userId
console.log(toCamelCase('SCREEN_NAME'));   // screenName
console.log(toCamelCase('mobile-number')); // mobileNumber
console.log(toCamelCase('userID'));        // userId
*/