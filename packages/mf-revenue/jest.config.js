module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.{ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(cheerio|@testing-library)/)',
  ],
  moduleNameMapper: {
    '^@blockhouse/shared-lib/(.*)$': '<rootDir>/../shared-lib/src/$1',
    '^@blockhouse/shared-lib$': '<rootDir>/../shared-lib/src/index.ts',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFiles: ['<rootDir>/src/setupTests.ts'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
