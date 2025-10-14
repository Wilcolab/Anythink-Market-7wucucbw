/**
 * Convert a given string into camelCase with robust handling of common input formats and edge cases.
 *
 * Behavior summary:
 * - Accepts snake_case, kebab-case, dot.case, space-separated, multiple delimiters, leading/trailing delimiters,
 *   PascalCase, SCREAMING_SNAKE_CASE, already camelCase, numeric segments, and mixed-case acronyms.
 * - Trims surrounding whitespace before processing.
 * - When delimiters are present (underscore, hyphen, or whitespace), the string is split on one-or-more delimiters,
 *   empty segments are discarded (so leading/trailing/multiple consecutive delimiters are ignored), each segment is
 *   lowercased, then the first segment is left lowercase and subsequent segments are capitalized and concatenated.
 * - When no delimiters are present, several heuristics apply:
 *   - If the whole string is uppercase letters and/or digits (e.g. "SCREAMING", "ID42"), the result is returned in
 *     lowercase ("screaming", "id42").
 *   - If the string is PascalCase (starts with an uppercase letter and otherwise contains only letters/digits),
 *     the leading character is lowercased (e.g. "PascalCase" -> "pascalCase").
 *   - If the string is already camelCase (starts with a lowercase letter and contains uppercase letters),
 *     it is preserved as-is.
 *   - Otherwise a single-word string is returned entirely lowercased.
 *
 * Notes & edge-cases:
 * - Empty or whitespace-only strings (after trimming) return the empty string.
 * - Non-string inputs (including null/undefined) cause a TypeError.
 * - The implementation normalizes all intermediate parts to lowercase before applying camel-casing rules,
 *   so existing internal capitalization (other than recognized PascalCase / camelCase forms) will be normalized.
 *
 * @param {string} input - The input string to convert to camelCase.
 * @returns {string} The converted camelCase string, or an empty string for empty/whitespace inputs.
 * @throws {TypeError} If input is null, undefined, or not of type string. The thrown error message is "Input must be a string".
 *
 * @example
 * toCamelCase('first_name');           // -> 'firstName'
 * @example
 * toCamelCase('user-id');              // -> 'userId'
 * @example
 * toCamelCase('SCREEN_NAME');          // -> 'screenName'
 * @example
 * toCamelCase('mobile--number');       // -> 'mobileNumber'
 * @example
 * toCamelCase('_leading_underscore');  // -> 'leadingUnderscore'
 * @example
 * toCamelCase('');                     // -> ''
 * @example
 * // Throws:
 * toCamelCase(null);                   // -> throws TypeError('Input must be a string')
 * @example
 * // Preserves already valid camelCase:
 * toCamelCase('alreadyCamelCase');     // -> 'alreadyCamelCase'
 */
 
/**
 * Convert a given string into dot.case (lowercase segments separated by dots) with robust handling
 * of common input formats and edge cases.
 *
 * Behavior summary:
 * - Accepts snake_case, kebab-case, dot.case, space-separated, multiple delimiters, leading/trailing delimiters,
 *   PascalCase, camelCase, SCREAMING_SNAKE_CASE, acronyms (e.g. "XMLHttpRequest"), and numeric segments.
 * - Trims surrounding whitespace before processing.
 * - If the string contains any of the delimiters dot (.), underscore (_), hyphen (-), or whitespace, it is split
 *   on one-or-more of those delimiters, empty segments are discarded, each segment is lowercased, and segments
 *   are joined using a single '.'.
 * - If no delimiters are present, the function attempts to split mixed-case words and acronyms by inserting dots:
 *   1. It breaks acronym-to-word boundaries using the pattern: uppercase-run followed by Uppercase+lowercase
 *      (e.g. "XMLHttp" -> "XML.Http").
 *   2. It splits lower-or-digit to Uppercase transitions (e.g. "userId" -> "user.Id").
 *   3. After inserting dots, runs of dots are collapsed, leading/trailing dots removed, and the whole string
 *      is lowercased.
 * - If the entire input is only uppercase letters and/or digits (e.g. "SCREAMING", "ID42"), the string is returned
 *   lowercased ("screaming", "id42") rather than split into segments.
 *
 * Notes & edge-cases:
 * - Empty or whitespace-only strings (after trimming) return the empty string.
 * - Non-string inputs (including null/undefined) cause a TypeError.
 * - Numeric characters are allowed and preserved; when they appear adjacent to uppercase sequences they remain part
 *   of that segment (e.g. "ID42" -> "id42"), while mixed placements may be split according to the regex rules
 *   (e.g. "userID2" -> "user.id2").
 *
 * @param {string} input - The input string to convert to dot.case.
 * @returns {string} The converted dot.case string (all lowercase, segments separated by single dots), or an empty string for empty/whitespace inputs.
 * @throws {TypeError} If input is null, undefined, or not of type string. The thrown error message is "Input must be a string".
 *
 * @example
 * toDotCase('first_name');           // -> 'first.name'
 * @example
 * toDotCase('user-id');              // -> 'user.id'
 * @example
 * toDotCase('SCREEN_NAME');          // -> 'screen.name'
 * @example
 * toDotCase('mobile--number');       // -> 'mobile.number'
 * @example
 * toDotCase('_leading_underscore');  // -> 'leading.underscore'
 * @example
 * toDotCase('');                     // -> ''
 * @example
 * // Throws:
 * toDotCase(null);                   // -> throws TypeError('Input must be a string')
 * @example
 * toDotCase('already.dot.case');     // -> 'already.dot.case'
 * @example
 * // Handles acronyms and mixed-case words:
 * toDotCase('XMLHttpRequest');       // -> 'xml.http.request'
 * @example
 * // Mixed acronym with digits:
 * toDotCase('userID2');              // -> 'user.id2'
 */
/* * Convert various string formats to camelCase with robust error handling.
 *
 * Handles: snake_case, kebab-case, PascalCase, SCREAMING_SNAKE_CASE, spaces,
 * multiple delimiters, leading/trailing delimiters, and already-camelCase.
 *
 * Throws TypeError("Input must be a string") for null/undefined/non-string inputs.
 *
 * Examples:
 *   toCamelCase('first_name')           // 'firstName'
 *   toCamelCase('user-id')              // 'userId'
 *   toCamelCase('SCREEN_NAME')          // 'screenName'
 *   toCamelCase('mobile--number')       // 'mobileNumber'
 *   toCamelCase('_leading_underscore')  // 'leadingUnderscore'
 *   toCamelCase('')                     // ''
 *   toCamelCase(null)                   // throws TypeError
 *   toCamelCase(123)                    // throws TypeError
 *   toCamelCase('alreadyCamelCase')     // 'alreadyCamelCase'
 */
function toCamelCase(input) {
    if (input === null || input === undefined) {
        throw new TypeError('Input must be a string');
    }
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }

    const str = input.trim();
    if (str === '') return '';

    // If the string contains common delimiters, split on them (handles multiple/leading/trailing)
    if (/[_\-\s]/.test(str)) {
        const parts = str
            .split(/[_\-\s]+/) // split on one or more delimiters
            .filter(Boolean)   // remove empty segments from leading/trailing/multiple delimiters
            .map(part => part.toLowerCase());

        if (parts.length === 0) return '';

        const [first, ...rest] = parts;
        return first + rest.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    }

    // No delimiters present: handle single-word cases

    // All uppercase (e.g. "SCREAMING") -> lowercase
    if (/^[A-Z0-9]+$/.test(str)) {
        return str.toLowerCase();
    }

    // PascalCase (starts with uppercase, then letters/digits) -> lower first char
    if (/^[A-Z][a-zA-Z0-9]*$/.test(str)) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    // Already camelCase (starts with lowercase and contains uppercase) -> preserve
    if (/^[a-z][a-zA-Z0-9]*$/.test(str) && /[A-Z]/.test(str)) {
        return str;
    }

    // Default: return lowercase single-word
    return str.toLowerCase();
}

/**
 * Convert various string formats to dot.case with robust error handling.
 *
 * Handles: snake_case, kebab-case, PascalCase, camelCase, SCREAMING_SNAKE_CASE,
 * spaces, multiple delimiters, leading/trailing delimiters, and already.dot.case.
 *
 * Throws TypeError("Input must be a string") for null/undefined/non-string inputs.
 *
 * Examples:
 *   toDotCase('first_name')           // 'first.name'
 *   toDotCase('user-id')              // 'user.id'
 *   toDotCase('SCREEN_NAME')          // 'screen.name'
 *   toDotCase('mobile--number')       // 'mobile.number'
 *   toDotCase('_leading_underscore')  // 'leading.underscore'
 *   toDotCase('')                     // ''
 *   toDotCase(null)                   // throws TypeError
 *   toDotCase(123)                    // throws TypeError
 *   toDotCase('already.dot.case')     // 'already.dot.case'
 *   toDotCase('XMLHttpRequest')       // 'xml.http.request'
 */
function toDotCase(input) {
    if (input === null || input === undefined) {
        throw new TypeError('Input must be a string');
    }
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }

    const str = input.trim();
    if (str === '') return '';

    // If the string contains common delimiters, split on them (handles multiple/leading/trailing)
    if (/[._\-\s]/.test(str)) {
        const parts = str
            .split(/[._\-\s]+/) // split on one or more delimiters
            .filter(Boolean)    // remove empty segments from leading/trailing/multiple delimiters
            .map(part => part.toLowerCase());

        if (parts.length === 0) return '';

        return parts.join('.');
    }

    // No delimiters present: handle camelCase, PascalCase, acronyms, and mixed cases

    // All uppercase or digits (e.g. "SCREAMING", "ID42") -> lowercase
    if (/^[A-Z0-9]+$/.test(str)) {
        return str.toLowerCase();
    }

    // Insert dots between acronym boundaries and lower->upper transitions:
    // - Split "XMLHttpRequest" -> "XML.Http.Request"
    // - Split "userID2" -> "user.ID2"
    let s = str
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1.$2') // acronym boundary: "XMLHttp" -> "XML.Http"
        .replace(/([a-z0-9])([A-Z])/g, '$1.$2');    // lower-to-upper: "userId" -> "user.Id"

    // Normalize: collapse multiple dots, trim leading/trailing dots, lowercase
    s = s.replace(/\.+/g, '.').replace(/^\.+|\.+$/g, '').toLowerCase();

    return s;
}

module.exports = {
    toCamelCase,
    toDotCase
};

