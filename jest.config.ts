import type { Config } from 'jest';
import presets from 'jest-preset-angular/presets/index.js';
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json' with { type: 'json' };

const jestConfig: Config = {
  ...presets.createCjsPreset({ testEnvironment: 'jest-preset-angular/environments/jest-jsdom-env' }),
  roots: [
    '<rootDir>/src/'
  ],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|@angular/common/locales/.*\\.js$))'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  clearMocks: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/src/app/content/'
  ],
  coverageReporters: ['text-summary', 'html'],
  coverageDirectory: 'reports/coverage',
  coverageThreshold: {
    global: {
      branches: 99,
      functions: 99,
      lines: 99,
      statements: 99
    }
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>' }),
  }
};

export default jestConfig;
