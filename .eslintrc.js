const warnInDevelopment =
  process.env.NODE_ENV === 'production' ? 'error' : 'warn'

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],

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
    'prettier/prettier': warnInDevelopment,

    // Allow debugger and console statement in development
    'no-debugger': warnInDevelopment,
    'no-console': warnInDevelopment,
    // Enable i++ in for loops
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

    'arrow-body-style': ['off'],
    'comma-dangle': 'off',
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    'linebreak-style': 'off',
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['state'],
        props: true,
      },
    ],
    'no-unused-expressions': 'warn',
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        vars: 'all',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
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
