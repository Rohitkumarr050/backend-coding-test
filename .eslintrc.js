module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [
  ],
  plugins: ['prettier'],
  parserOptions: {
      ecmaVersion: 'latest',
  },
  rules: {
      'prettier/prettier': 'error',
      'no-console': 'off',
      'no-restricted-syntax': 'off',
      'no-prototype-builtins': 'off',
  },
};
