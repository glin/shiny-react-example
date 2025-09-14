import js from '@eslint/js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'

export default [
  // Global ignores - built files
  {
    ignores: ['**/dist/'],
  },

  // Base configuration for all files
  js.configs.recommended,

  // React configuration for src files
  {
    files: ['src/**/*.{js,jsx}'],

    plugins: {
      react,
      'react-hooks': reactHooks,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      // React recommended rules
      ...react.configs.recommended.rules,

      // JSX runtime rules (for React 17+)
      ...react.configs['jsx-runtime'].rules,

      // React hooks rules
      ...reactHooks.configs.recommended.rules,
    },
  },
]
