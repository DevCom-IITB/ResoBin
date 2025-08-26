const isDev = process.env.NODE_ENV === 'development'
const warnInDevelopment = isDev ? 'warn' : 'error'

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    'react-app',
    'react-app/jest',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],

  ignorePatterns: ['node_modules/*', 'public/*', 'build/*'],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },

  plugins: ['prettier', 'promise', 'react'],

  rules: {
    'arrow-body-style': ['off'],
    'comma-dangle': 'off',
    // ? git handles this instead
    'linebreak-style': 'off',
    // ? allow debugger and console statement in development
    'no-console': warnInDevelopment,
    'no-debugger': warnInDevelopment,
    // ? for use with redux-toolkit (immer)
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['state'],
        props: true,
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'styled-components',
            message: "Please import from 'styled-components/macro.'",
          },
        ],
        patterns: ['!styled-components/macro'],
      },
    ],
    'no-unused-expressions': 'warn',
    'no-unused-vars': [
      warnInDevelopment,
      {
        args: 'none',
        vars: 'all',
        varsIgnorePattern: '[iI]gnore',
      },
    ],
    semi: 'off',
    'import/extensions': [
      warnInDevelopment,
      'always',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    // THIS IS THE FIX TO PREVENT THE ERROR LOOP
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    // ? shift to TypeScript for this
    'react/prop-types': 'off',
    // ? react 17 doesn't need this
    'react/react-in-jsx-scope': 'off',
    // ? checks effect dependencies
    'react-hooks/exhaustive-deps': 'warn',
  },

  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
}