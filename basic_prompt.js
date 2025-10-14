/**
 * Convert a string to camelCase.
 * Examples:
 *   toCamelCase('hello_world') -> 'helloWorld'
 *   toCamelCase('  Foo-bar baz ') -> 'fooBarBaz'
 *
 * @param {string} str
 * @returns {string}
 */
function toCamelCase(str) {
    if (!str || typeof str !== 'string') return '';

    return str
        .trim()
        .split(/[_\-\s]+/)     // split on underscores, hyphens, or whitespace
        .filter(Boolean)
        .map((word, i) => {
            const lower = word.toLowerCase();
            if (i === 0) return lower;
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

module.exports = toCamelCase;