/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => {
  return {
    // Indicates whether the coverage information should be collected while executing the test
    // collectCoverage: false,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // An array of regexp pattern strings used to skip coverage collection
    coveragePathIgnorePatterns: ['/node_modules/'],

    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: ['node_modules'],

    // Run tests from one or more projects
    projects: [
      {
        displayName: 'node:unit',
        testEnvironment: 'node',
        transform: {
          "^.+\\.tsx?$": "babel-jest"
        },
        testRegex: 'test/unit/.*\\.spec\\.ts',
      },
      {
        displayName: 'dom:e2e',
        testRegex: 'test/e2e/.*\\.spec\\.ts',
        transform: {
          "^.+\\.tsx?$": "babel-jest"
        },
        preset: 'jest-puppeteer',
      },
    ] as unknown[] as string[], // bad types

    // The root directory that Jest should scan for tests and modules within
    rootDir: 'test',

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['/node_modules/'],
  }
}
