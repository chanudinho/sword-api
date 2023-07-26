/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
    clearMocks: true,

    collectCoverage: true,

    collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.js', '<rootDir>/src/lib/*.js'],

    coverageDirectory: 'coverage',

    coverageProvider: 'v8',

    setupFilesAfterEnv: ['./jest.setup.js'],

    testEnvironment: 'node',

    verbose: true
}
