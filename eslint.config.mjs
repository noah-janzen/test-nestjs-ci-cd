import { configs } from '@eslint/js';
import { node, jest } from 'globals';

import { configs as _configs, parser as _parser } from 'typescript-eslint';

import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['**/eslint.config.js'],
  },

  configs.recommended,
  ..._configs.recommendedTypeChecked,
  ..._configs.stylisticTypeChecked,
  eslintConfigPrettier,

  {
    languageOptions: {
      globals: {
        ...node,
        ...jest,
      },

      parser: _parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    // Rules
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
