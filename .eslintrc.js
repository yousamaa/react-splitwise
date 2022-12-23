module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSpacing: true,
        endOfLine: 'lf',
        jsxBracketSameLine: false,
        jsxSingleQuote: true,
        'no-duplicate-variable': [true, 'check-parameters'],
        'no-var-keyword': true,
        printWidth: 100,
        quoteProps: 'as-needed',
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false
      }
    ],
    'jsx-quotes': [2, 'prefer-single'],
    'max-lines': ['error', { max: 200, skipBlankLines: true }],
    'no-alert': 'error',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-duplicate-imports': 'off',
    'no-magic-numbers': ['error', { ignore: [-1, 0, 1, 2, 100] }],
    'no-undef': 'off',
    'prefer-arrow-callback': 0,
    'prefer-const': 0,
    quotes: [0, 'double'],
    'react/jsx-no-useless-fragment': 'error',
    'react/no-array-index-key': 'error',
    'react/react-in-jsx-scope': 0
  }
}
