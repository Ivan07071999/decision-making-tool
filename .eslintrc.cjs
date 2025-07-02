module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'prettier/prettier': 'warn',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-debugger': 'off',
    'no-trailing-spaces': 'error',
    'class-methods-use-this': 'off',
    'max-len': ['error', { code: 120 }],
    indent: ['error', 2],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],

    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: ['function', 'class'] },
      { blankLine: 'any', prev: ['function', 'class'], next: '*' },
    ],

    'block-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'space-infix-ops': ['error', { int32Hint: false }],

    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      { accessibility: 'explicit', overrides: { constructors: 'off' } },
    ],
    '@typescript-eslint/member-ordering': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
