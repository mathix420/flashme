module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-standard'],
  // https://stylelint.io/user-guide/configuration
  rules: {
    'no-empty-source': null,
    'at-rule-no-unknown': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ]
  }
}
