// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
    ignorePatterns: ['apps/**', 'packages/**'],
    extends: ['@bitspace/eslint-config/library.js', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true
    }
};
