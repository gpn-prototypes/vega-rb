const path = require('path');

const setupTestFile = path.resolve('src/setupTests.ts');

const config = require('@gpn-prototypes/frontend-configs/jest/jest.config')({
  setupFilesAfterEnv: setupTestFile,
});

module.exports = {
  ...config,
  modulePaths: ['<rootDir>/src/'],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  transformIgnorePatterns: ['node_modules/?!(@gpn-prototypes)/'],
};
