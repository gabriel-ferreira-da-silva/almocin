module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '',
  testRegex: ['.steps.ts$', '.spec.ts$'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/utils/auth",
    "<rootDir>/src/core",
    "<rootDir>/src/services/login.service.ts",
    "<rootDir>/src/controllers/login.controller.ts",
  ]
};

