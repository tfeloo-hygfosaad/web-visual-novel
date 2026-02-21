import globals from 'globals';
import js from '@eslint/js';

import { defineConfig, globalIgnores } from 'eslint/config';

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

const eslintConfig = defineConfig([
  /*
   * Base JS + stylistic
   */
  js.configs.recommended,
  stylistic.configs.recommended,

  /*
   * TypeScript: strict + stylistic (type-aware)
   */
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  /*
   * Custom stylistic enforcement
   */
  {
    plugins: { '@stylistic': stylistic },
    rules: {
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs'],
      '@stylistic/function-paren-newline': ['error', 'consistent'],
      '@stylistic/linebreak-style': 'off',
      '@stylistic/max-len': [
        'error',
        {
          code: 130,
          tabWidth: 2,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: { delimiter: 'comma', requireLast: true },
          singleline: { delimiter: 'comma', requireLast: false },
          multilineDetection: 'brackets',
        },
      ],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1,
          maxBOF: 0,
        },
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'multiline-const', next: '*' },
      ],
      '@stylistic/semi': ['error', 'always'],
    },
  },

  /*
   * TS plugin tweaks
   */
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
    },
  },

  /*
   * Next.js (includes React, Hooks, A11y)
   * core-web-vitals is stricter than recommended
   */
  ...nextVitals,
  ...nextTs,

  /*
   * Project-specific React tweaks
   */
  {
    rules: {
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      'react/no-danger': 'off',
    },
  },

  /*
   * Page file override (fixed glob)
   */
  {
    files: ['**/page.tsx'],
    rules: {
      'react/destructuring-assignment': 'off',
    },
  },

  /*
   * Ignore build artifacts
   */
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'src/lib/supabase/types.ts',
  ]),

  /*
   * Type-aware parser settings
   */
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        project: 'tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
  },

  /*
   * CommonJS globals
   */
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        module: 'readonly',
        process: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
  },

  /*
   * Proper TypeScript import resolver
   * (replaces import-x/resolver-next block)
   */
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: 'tsconfig.json',
          alwaysTryTypes: true,
        },
      },
    },
  },
]);

export default eslintConfig;
