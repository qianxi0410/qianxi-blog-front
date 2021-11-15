module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    'prettier'
  ],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    eqeqeq: 'error',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/newline-after-import': 'off',
    'no-else-return': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off'
  }
};
