const warnInDevelopment =
  process.env.NODE_ENV === 'production' ? 'error' : 'warning'

module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-styled-components',
    'stylelint-config-rational-order',
  ],
  defaultSeverity: warnInDevelopment,
  overrides: [
    {
      files: ['**/*.{js,ts,jsx,tsx}'],
      customSyntax: '@stylelint/postcss-css-in-js',
    },
  ],

  rules: {
    'at-rule-no-unknown': null,
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-semicolon-newline-after': 'always-multi-line',
    'function-name-case': null,
    'max-nesting-depth': 3,
    'no-eol-whitespace': true,
    'no-invalid-position-at-import-rule': null,
    'number-leading-zero': 'always',
    'value-keyword-case': null,
    'value-no-vendor-prefix': [
      true,
      {
        ignoreValues: ['box'],
      },
    ],
    'property-no-vendor-prefix': [
      true,
      {
        ignoreProperties: ['box-orient'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local'],
      },
    ],
  },
}
