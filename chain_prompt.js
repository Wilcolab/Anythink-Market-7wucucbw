/**
 * Convert a string to kebab-case.
 * Steps:
 * 1. Validate input (must be a non-null string). Empty string returns ''.
 * 2. Insert hyphens between word boundaries (camelCase, PascalCase, acronyms),
 *    replace underscores/spaces with hyphens, lowercase, and normalize hyphens.
 */
function toKebabCase(input) {
    if (input === null || input === undefined || typeof input !== 'string') {
        throw new Error('Input must be a string');
    }
    if (input === '') return '';

    // Insert hyphen between lowercase/digit and uppercase (e.g., firstName -> first-Name)
    // Insert hyphen between uppercase sequence and a following Capital+lower (e.g., XMLHttp -> XML-Http)
    // Then replace underscores/spaces with hyphens, lower-case, collapse duplicates, trim edges.
    return input
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/[_\s]+/g, '-')
        .toLowerCase()
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

/* ---------- Tests ---------- */
const cases = [
    // conversions from different formats
    ['firstName', 'first-name'],
    ['user_id', 'user-id'],
    ['SCREEN_NAME', 'screen-name'],
    ['PascalCase', 'pascal-case'],
    ['XMLHttpRequest', 'xml-http-request'],
    ['userID', 'user-id'],

    // edge cases: empty, multiple delimiters, leading/trailing delimiters/spaces
    ['', ''],
    ['--multiple__delimiters  test--', 'multiple-delimiters-test'],
    ['  leading trailing  ', 'leading-trailing'],
    ['---already--kebab---', 'already-kebab']
];

for (const [input, expected] of cases) {
    const result = toKebabCase(input);
    console.log(`${JSON.stringify(input)} -> ${result} ${result === expected ? '✅' : `❌ (expected ${expected})`}`);
}

// Error handling tests
const invalids = [null, undefined, 123, { a: 1 }];
for (const bad of invalids) {
    try {
        toKebabCase(bad);
        console.log(`ERROR: expected to throw for ${String(bad)}`);
    } catch (e) {
        console.log(`Threw for ${String(bad)}: ${e.message}`);
    }
}