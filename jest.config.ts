// @ts-nocheck
import { compilerOptions } from './tsconfig.json';

let moduleNameMapper = {};
try {
  const { pathsToModuleNameMapper } = require('ts-jest');
  moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../',
  });
} catch (e) {
  // ts-jest not available, use empty mapper
}

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper,
};
