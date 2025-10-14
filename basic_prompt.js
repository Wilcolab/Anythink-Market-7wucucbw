// basic_prompt.js
// convertToCamelCase: converts a string to camelCase.
// Examples:
//   convertToCamelCase("hello world") => "helloWorld"
//   convertToCamelCase("  Foo-BAR_baz  ") => "fooBarBaz"
// Supports Unicode letters and numbers.
function convertToCamelCase(input) {
    if (typeof input !== 'string') return '';

    // Match runs of letters or numbers (Unicode-aware)
    const words = input.match(/[\p{L}\p{N}]+/gu);
    if (!words || words.length === 0) return '';

    const first = words[0].toLowerCase();
    const rest = words.slice(1).map(word => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    });

    return first + rest.join('');
}

module.exports = { convertToCamelCase };