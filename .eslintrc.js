module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'eqeqeq': 'off',
    'one-var': 'off',
    'camelcase': 'off',
    'comma-dangle': 'off',
    'no-return-assign': 'off',
    'object-curly-spacing': 'off',
    'object-property-newline': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
