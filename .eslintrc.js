const warnInDevelopment =
  process.env.NODE_ENV === 'production' ? 'error' : 'warn'

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'react-app',
    'react-app/jest',
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

  plugins: ['react', 'prettier', 'import', 'jsx-a11y', 'react-hooks'],

  rules: {
    // Allow debugger and console statement in development
    'no-debugger': warnInDevelopment,
    'no-console': warnInDevelopment,

    // Enable i++ in for loops
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'object-shorthand': 0,
    'arrow-body-style': ['off'],
    'comma-dangle': 'off',

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

    // Git handles this instead
    'linebreak-style': 'off',

    // For use with redux-toolkit (immer)
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['state'],
        props: true,
      },
    ],

    'no-unused-expressions': 'warn',
    'no-unused-vars': [
      warnInDevelopment,
      {
        args: 'none',
        vars: 'all',
      },
    ],
    'react/jsx-props-no-spreading': 'off',

    // Shift to TypeScript for this
    'react/prop-types': 'off',

    // React 17 doesn't need this
    'react/react-in-jsx-scope': 'off',

    // Checks rules of Hooks
    'react-hooks/rules-of-hooks': 'error',
    // Checks effect dependencies
    'react-hooks/exhaustive-deps': 'warn',
    

    semi: 'off',
  },

  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
}
